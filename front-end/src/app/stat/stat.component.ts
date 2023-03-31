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

  isTempsOpen = false;
  isEssaisOpen = false;
  isErreursOpen = false;
  isIndicesOpen = false;

  constructor(private patientService: PatientService) { }
  

  ngOnInit(): void {
    this.nom = this.patient.value?.nom as string;
    this.prenom = this.patient.value?.prenom as string;
    this.stockImage = this.patient.value?.photo as string;
    this.stade = "Stade " + this.patient.value?.stade as string;

    // On remplit des données pour l'exemple
    this.partiesJouees = Math.floor(Math.random() * 30);
  }

  toggleTemps() {
    this.isTempsOpen = !this.isTempsOpen;
  }
  
  toggleEssais() {
    this.isEssaisOpen = !this.isEssaisOpen;
  }

  toggleErreurs() {
    this.isErreursOpen = !this.isErreursOpen;
  }

  toggleIndices() {
    this.isIndicesOpen = !this.isIndicesOpen;
  }

}