import { Component, OnInit } from '@angular/core';
import {Patient} from "../../models/patient.models";
import {PatientService} from "../services/patient.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
  public patient = this.patientService.patientSelectionne$;
  public partiesJouees: number = 0;
  public tempsDeJeu: number = 0;
  public nbEssai: number = 0;
  public nbErreur: number = 0;
  public nbIndices: number = 0;

  constructor(private router: Router,private patientService : PatientService) {}

  ngOnInit(): void {
    this.remplirData();
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
    
    // On remplit des données pour l'exemple
    this.partiesJouees = Math.floor(Math.random() * 100);
    this.tempsDeJeu = Math.floor(Math.random() * 1000);
    this.nbEssai = Math.floor(Math.random() * 50);
    this.nbErreur = Math.floor(Math.random() * 10);
    this.nbIndices = Math.floor(Math.random() * 20);
  }

}