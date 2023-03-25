import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {FormThemeService} from "../services/formTheme.service";
import {Theme} from "../../models/theme.models";
import {ThemeService} from "../services/theme.service";

@Component({
  selector: 'app-footer-creer-theme',
  templateUrl: './footer-creer-theme.component.html',
  styleUrls: ['./footer-creer-theme.component.scss']
})
export class FooterCreerThemeComponent {
  // @ts-ignore
  nom : string ="";
  // @ts-ignore
  images : any[]= [];
  @Input()
  theme : Theme |undefined;
  @Output()
  erreur : EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router,public formThemeService: FormThemeService,private themeService : ThemeService) {

  }
  ngOnInit(): void {
    this.formThemeService.nomSubject$.subscribe(nom => {
     this.nom = nom;

    });
    this.formThemeService.imageSubject$.subscribe(images => {
      this.images = images;
    });
  }
  retourListeTheme() {   this.themeService.setEditTheme(undefined);
    this.router.navigate(['/liste-theme']);
  }
  ajouterTheme(){
    let ajout : boolean = false;
  if(this.theme == undefined) {
    const theme: Theme = new Theme(this.nom, this. images)
    this.theme = theme;
    ajout = true;
  }
    else{
      this.theme.titre = this.nom;
    this.theme.images = this.images;
    ajout = false;
    }

    if ((this.theme.titre != "") && this.theme.images.length != 0) {
      this.erreur.emit(false);
      if(ajout) {
        this.themeService.addTheme(this.theme);
      }
      this.router.navigate(['/liste-theme']);
    } else {
      this.erreur.emit(true);

    }
    this.themeService.setEditTheme(undefined);
  }
}
