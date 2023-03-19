import { Component, OnInit } from '@angular/core';
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
  constructor(private router: Router,private formThemeService: FormThemeService) {

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
    console.log(theme.titre);
    console.log(theme.images);
  }
}
