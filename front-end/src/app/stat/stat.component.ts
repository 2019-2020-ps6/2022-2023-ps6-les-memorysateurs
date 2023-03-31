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
  private boutonsTableau : HTMLCollectionOf<Element> |undefined;
  isTempsOpen = false;
  isEssaisOpen = false;
  isErreursOpen = false;
  isIndicesOpen = false;

  constructor(private patientService: PatientService) {
     }


  ngOnInit(): void {
    this.nom = this.patient.value?.nom as string;
    this.prenom = this.patient.value?.prenom as string;
    this.stockImage = this.patient.value?.photo as string;
    this.stade = "Stade " + this.patient.value?.stade as string;
    this.boutonsTableau= document.getElementsByClassName("bouton-tableau");

    // On remplit des données pour l'exemple
    this.partiesJouees = Math.floor(Math.random() * 30);
  }

  toggleTemps() {

    this.isTempsOpen = !this.isTempsOpen;
    if(this.boutonsTableau !=undefined)
      for(let i=0 ;i< this.boutonsTableau.length;i++) {
        let bouton = this.boutonsTableau.item(i) as HTMLButtonElement;
        if (bouton.id === "plus-temps") {
          if(this.isTempsOpen)
            bouton.innerHTML = "-";
          else
            bouton.innerHTML = "+";
        }
      }

  }

  toggleEssais() {
    this.isEssaisOpen = !this.isEssaisOpen;
    if(this.boutonsTableau !=undefined)
    for(let i=0 ;i< this.boutonsTableau.length;i++) {
      let bouton = this.boutonsTableau.item(i) as HTMLButtonElement;
      if (bouton.id === "plus-essais") {
        if(this.isEssaisOpen)
        bouton.innerHTML = "-";
        else
          bouton.innerHTML = "+";
      }
    }
  }

  toggleErreurs() {
    this.isErreursOpen = !this.isErreursOpen;
    if(this.boutonsTableau !=undefined)
      for(let i=0 ;i< this.boutonsTableau.length;i++) {
        let bouton = this.boutonsTableau.item(i) as HTMLButtonElement;
        if (bouton.id === "plus-erreurs") {
          if(this.isErreursOpen)
            bouton.innerHTML = "-";
          else
            bouton.innerHTML = "+";
        }
      }

  }

  toggleIndices() {
    this.isIndicesOpen = !this.isIndicesOpen;
    if(this.boutonsTableau !=undefined)
      for(let i=0 ;i< this.boutonsTableau.length;i++) {
        let bouton = this.boutonsTableau.item(i) as HTMLButtonElement;
        if (bouton.id === "plus-indices") {
          if(this.isIndicesOpen)
            bouton.innerHTML = "-";
          else
            bouton.innerHTML = "+";
        }
      }
  }

}
