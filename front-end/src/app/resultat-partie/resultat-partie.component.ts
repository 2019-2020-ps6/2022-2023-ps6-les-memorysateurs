import { Component } from '@angular/core';
import {ThemeService} from "../services/theme.service";
import {GameService} from "../services/game.service";
import {Router} from "@angular/router";
import {Theme} from "../../models/theme.models";
import {PatientService} from "../services/patient.service";
import {Patient} from "../../models/patient.models";

@Component({
  selector: 'app-resultat-partie',
  templateUrl: './resultat-partie.component.html',
  styleUrls: ['./resultat-partie.component.scss']
})
export class ResultatPartieComponent {
  imageTheme!: any[];
  patientSelectionne!: Patient;

  constructor(public router: Router, public themeService: ThemeService,public patientService: PatientService, public gameService: GameService) {
    themeService.themeSelectionne$.subscribe((theme: Theme) =>{
      this.imageTheme = theme.images;
    });

    patientService.patientSelectionne$.subscribe((patient: Patient | undefined) => {
      if(patient != undefined){
        this.patientSelectionne = patient;

      }
    });
  }

  onStatistiques() {
    this.router.navigateByUrl("");
  }

  onRelancerPartie() {
    this.router.navigateByUrl("creer-memory");
  }
}
