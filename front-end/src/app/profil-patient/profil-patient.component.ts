import { Component } from '@angular/core';
import {Patient} from "../../models/patient.models";
import {Router} from "@angular/router";
import {PatientService} from "../services/patient.service";
import {ThemeService} from "../services/theme.service";
import {GameService} from "../services/game.service";


@Component({
  selector: 'app-profil-patient',
  templateUrl: './profil-patient.component.html',
  styleUrls: ['./profil-patient.component.scss']
})
export class ProfilPatientComponent {
  public patient = this.patientService.patientSelectionne$;

  constructor(private router: Router,private patientService : PatientService,private themeService : ThemeService,private gameService : GameService) {}

  ngOnInit(): void {
    this.remplirData();
    this.gameService.setReglages(this.patientService.patientSelectionne$.value);
  }
  remplirData(){
    const name = document.getElementById("input-nom") as HTMLInputElement;
    name.innerHTML = this.patient.value?.nom as string;
    const prenom = document.getElementById("input-prenom") as HTMLInputElement;
    prenom.innerHTML = this.patient.value?.prenom as string;
    const stockImage = document.getElementById("affichage-photo") as HTMLImageElement;
    stockImage.src = this.patient.value?.photo as string;
    const stade = document.getElementById("info-stade") as HTMLInputElement;
    stade.innerHTML = "Stade " + this.patient.value?.stade ;
  }

  modifierProfil(){
    let patientEdite: Patient = this.patientService.getPatientById(this.patient.value?.id as number);
    this.patientService.patientEdite$.next(patientEdite);
    this.router.navigateByUrl('creer-patient');
  }

  navReglagePartie(){
    let patientSelect: Patient = this.patientService.getPatientById(this.patient.value?.id as number);
    this.router.navigateByUrl('creer-memory');
  }

  navStat(){
    let patientSelect: Patient = this.patientService.getPatientById(this.patient.value?.id as number);
    this.patientService.patientSelectionne$.next(patientSelect);
    this.router.navigateByUrl('stat');
  }

  retour(): void {
    this.router.navigateByUrl("liste-patient");
  }
}
