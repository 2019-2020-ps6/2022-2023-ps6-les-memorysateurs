import { Component } from '@angular/core';
import {Theme} from "../../models/theme.models";
import {ThemeService} from "../services/theme.service";
import {Router} from "@angular/router";
import {Cardable} from "../../models/cardable.models";
import {PatientService} from "../services/patient.service";
import {LISTE_THEME} from "../../moks/liste-theme.moks";

@Component({
  selector: 'app-liste-theme',
  templateUrl: './liste-theme.component.html',
  styleUrls: ['./liste-theme.component.scss']
})
export class ListeThemeComponent {
  listeTheme: Cardable[] = [];

  constructor(public router: Router, public themeService: ThemeService,public patientService : PatientService) {
    this.themeService.listeThemes$.subscribe((themes: Theme[]) => {
      this.listeTheme = themes;
    });
    let patientSelect = this.patientService.patientSelectionne$;
    this.themeService.setThemes(patientSelect.value?.themes);
  }


  onSelectionner(id : number){
    let themeSelectionne: Theme = this.themeService.getThemeById(id);
    this.themeService.themeSelectionne$.next(themeSelectionne);
    this.router.navigateByUrl('creer-memory');
  }

  onEditer(id : number){
    let themeEdite: Theme = this.themeService.getThemeById(id);
    this.themeService.themeEdite$.next(themeEdite);
    this.router.navigateByUrl('creer-theme');
  }

  onAjouterTheme(){
    this.router.navigateByUrl('creer-theme')
  }
}
