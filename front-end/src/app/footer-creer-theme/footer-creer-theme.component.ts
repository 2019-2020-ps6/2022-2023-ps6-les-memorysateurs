import { Component, OnInit,Output, EventEmitter } from '@angular/core';
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
  nom : string;
  // @ts-ignore
  images : any[]= [];

  @Output()
  erreur : EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router,private formThemeService: FormThemeService,private themeService : ThemeService) {

  }
  ngOnInit(): void {
    this.formThemeService.getNom().subscribe(nom => {
     this.nom = nom;
    });
    this.formThemeService.getImages().subscribe(images => {
      this.images = images;
    });
  }
  retourListeTheme() {
    this.router.navigate(['/liste-theme']);
  }
  ajouterTheme(){
    const theme : Theme = {
      titre : this.nom,
      images : this.images
    };
    if(theme.titre.length != 0 && theme.images.length !=0) {
      this.erreur.emit(false);
      this.themeService.addTheme(theme);
      this.router.navigate(['/liste-theme']);
    }
    else{
      this.erreur.emit(true);

    }

  }
}
