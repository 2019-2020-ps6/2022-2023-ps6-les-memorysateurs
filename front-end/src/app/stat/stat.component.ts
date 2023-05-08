import { Component, OnInit } from '@angular/core';
import {Patient} from "../../models/patient.models";
import {PatientService} from "../services/patient.service";

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
  public patient = this.patientService.patientSelectionne$;
  public partiesJouees: number = 0;
  public nom: string = "";
  public prenom: string = "";
  public stockImage: string = "";
  public stade: string = "";
  public isTemps: boolean = false;
  public isIndices: boolean = false;
  public isErreurs: boolean = false;
  public isEssais: boolean = false;
  public isDisplayed: boolean = this.isTemps || this.isIndices || this.isErreurs || this.isEssais;

  constructor(private patientService: PatientService) {
  }


  ngOnInit(): void {
    this.nom = this.patient.value?.nom as string;
    this.prenom = this.patient.value?.prenom as string;
    this.stockImage = this.patient.value?.photo as string;
    this.stade = "Stade " + this.patient.value?.stade as string;

    // On remplit des données pour l'exemple
    this.partiesJouees = <number>this.patient.getValue()?.getStats()?.length;
  }

  activeStat(event: string) {
    event = event.toLowerCase();
      switch(event){
        case "temps":
          this.isTemps = !this.isTemps;
          break;
        case "indices":
          this.isIndices = !this.isIndices;
          break;
        case "erreurs":
          this.isErreurs = !this.isErreurs;
          break;
        case "essais":
          this.isEssais = !this.isEssais;
          break;
      }
      this.isDisplayed = this.isTemps || this.isIndices || this.isErreurs || this.isEssais;
  }

  retour(): void {
    window.history.back();
  }
}
