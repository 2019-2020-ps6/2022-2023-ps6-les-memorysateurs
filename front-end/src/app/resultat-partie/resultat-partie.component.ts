import { Component } from '@angular/core';
import {ThemeService} from "../services/theme.service";
import {GameService} from "../services/game.service";
import {Router} from "@angular/router";
import {Theme} from "../../models/theme.models";
import {PatientService} from "../services/patient.service";
import {Patient} from "../../models/patient.models";
import {StatistiquesService} from "../services/statistiques.service";
import {Statistiques} from "../../models/statistiques.models";

@Component({
  selector: 'app-resultat-partie',
  templateUrl: './resultat-partie.component.html',
  styleUrls: ['./resultat-partie.component.scss']
})
export class ResultatPartieComponent {
  imageTrouvees!: string[];
  patientSelectionne!: Patient;
  public listeStatistiques: Statistiques[] | undefined = []

  constructor(public router: Router, public themeService: ThemeService,public patientService: PatientService, public gameService: GameService, public statsService: StatistiquesService) {
    gameService.imagesCartesTrouvees$.subscribe((images: string[]) =>{
      this.imageTrouvees = images;
    });

    patientService.patientSelectionne$.subscribe((patient: Patient | undefined) => {
      if(patient != undefined){
        this.patientSelectionne = patient;

      }
    });

    statsService.listeStatistiques$.subscribe((statistiques) => {
      this.listeStatistiques = statistiques;
    });
  }

  onStatistiques() {

    this.router.navigateByUrl("stat");
  }

  onRelancerPartie() {

    this.router.navigateByUrl("game");
  }

  onNouvellePartie(){
    this.router.navigateByUrl("creer-memory");
  }

  getImage() {
    return this.patientSelectionne.photo;
  }

  getPrenom() {
    return this.patientSelectionne.prenom;
  }

  getNom() {
    return this.patientSelectionne.nom;
  }
  
}
