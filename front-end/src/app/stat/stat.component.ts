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

  progresTemps = false;
  progresEssais = false;
  progresErreurs = false;
  progresIndices = false;

  constructor(private patientService: PatientService) {
     }


  ngOnInit(): void {
    this.nom = this.patient.value?.nom as string;
    this.prenom = this.patient.value?.prenom as string;
    this.stockImage = this.patient.value?.photo as string;
    this.stade = "Stade " + this.patient.value?.stade as string;
    this.boutonsTableau= document.getElementsByClassName("bouton-tableau");

    // On remplit des données pour l'exemple
    this.partiesJouees = <number>this.patient.getValue()?.getStats()?.length;
    this.setUpTabTemps();
    this.setUpTabEssais();
    this.setUpTabErreurs();
    this.setUpTabIndices();
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


  setUpTabTemps(){
    let grid = document.getElementById("tab-temps") as HTMLDivElement;
    let totalTemps = 0;

    // @ts-ignore

    for( let i =this.patient.getValue()?.getStats()?.length-1; i>=0;i--){
      let stats = this.patient.getValue()?.getStat(0);
      let stade = document.createElement('p');
      stade.innerHTML = "" + this.patient.getValue()?.stade;
      grid.append(stade);
      let date = document.createElement('p');
      let tmp : Date | undefined= this.patient.getValue()?.getStat(i)?.getDate();
      date.innerHTML = "" +tmp?.getDay() +"/"+ tmp?.getMonth() + "/" +tmp?.getFullYear();
      grid.append(date);
      let cartes = document.createElement('p');
      cartes.innerHTML = "" +this.patient.getValue()?.getStat(i)?.getNbCartes();
      grid.append(cartes);
      let temps = document.createElement('p');
      let secondes = this.patient.getValue()?.getStat(i)?.getTemps();
      if(secondes != undefined)
        totalTemps += secondes;
      // @ts-ignore
      temps.innerHTML = "" + Math.floor(secondes/60) +"min" + Math.floor(secondes%60) +"s" ;
      grid.append(temps);

    }
    let moyenneTemps = document.getElementById("moyenne-temps") as HTMLParagraphElement;

    // @ts-ignore
    totalTemps = totalTemps/this.patient.getValue()?.getStats()?.length;
    moyenneTemps.innerHTML = "" + Math.floor(totalTemps/60) +"min" + Math.floor(totalTemps%60) +"s";
    // @ts-ignore
    if(totalTemps >= this.patient.getValue()?.getStat(this.patient.getValue()?.getStats()?.length-1)?.getTemps()){
      this.progresTemps = true;
    }else{
      this.progresTemps = false;
    }
  }

  setUpTabEssais(){
    let grid = document.getElementById("tab-essais") as HTMLDivElement;
    let totalEssais = 0;

    // @ts-ignore

    for( let i =this.patient.getValue()?.getStats()?.length-1; i>=0;i--){
      let stats = this.patient.getValue()?.getStat(0);
      let stade = document.createElement('p');
      stade.innerHTML = "" + this.patient.getValue()?.stade;
      grid.append(stade);
      let date = document.createElement('p');
      let tmp : Date | undefined= this.patient.getValue()?.getStat(i)?.getDate();
      date.innerHTML = "" +tmp?.getDay() +"/"+ tmp?.getMonth() + "/" +tmp?.getFullYear();
      grid.append(date);
      let cartes = document.createElement('p');
      cartes.innerHTML = "" +this.patient.getValue()?.getStat(i)?.getNbCartes();
      grid.append(cartes);
      let essais = document.createElement('p');


      // @ts-ignore
      totalEssais += this.patient.getValue()?.getStat(i)?.getEssais();
      essais.innerHTML = ""  +this.patient.getValue()?.getStat(i)?.getEssais();
      grid.append(essais);

    }
    let moyenneEssais = document.getElementById("moyenne-essais") as HTMLParagraphElement;

    // @ts-ignore
    totalEssais = totalEssais/this.patient.getValue()?.getStats()?.length;
    moyenneEssais.innerHTML = ""+ Math.floor(totalEssais);
    // @ts-ignore
    if(totalEssais >= this.patient.getValue()?.getStat(this.patient.getValue()?.getStats()?.length-1)?.getEssais()){
      this.progresEssais = true;
    }else{
      this.progresEssais = false;
    }
  }
  setUpTabErreurs(){
    let grid = document.getElementById("tab-erreurs") as HTMLDivElement;
    let totalErreurs = 0;

    // @ts-ignore

    for( let i =this.patient.getValue()?.getStats()?.length-1; i>=0;i--){
      let stats = this.patient.getValue()?.getStat(0);
      let stade = document.createElement('p');
      stade.innerHTML = "" + this.patient.getValue()?.stade;
      grid.append(stade);
      let date = document.createElement('p');
      let tmp : Date | undefined= this.patient.getValue()?.getStat(i)?.getDate();
      date.innerHTML = "" +tmp?.getDay() +"/"+ tmp?.getMonth() + "/" +tmp?.getFullYear();
      grid.append(date);
      let cartes = document.createElement('p');
      cartes.innerHTML = "" +this.patient.getValue()?.getStat(i)?.getNbCartes();
      grid.append(cartes);
      let erreurs = document.createElement('p');


      // @ts-ignore
      totalErreurs += this.patient.getValue()?.getStat(i)?.getErreurs();
      erreurs.innerHTML = ""  +this.patient.getValue()?.getStat(i)?.getErreurs();
      grid.append(erreurs);

    }
    let moyenneErreurs = document.getElementById("moyenne-erreurs") as HTMLParagraphElement;

    // @ts-ignore
    totalErreurs = totalErreurs/this.patient.getValue()?.getStats()?.length;
    moyenneErreurs.innerHTML = ""+ Math.floor(totalErreurs);
    // @ts-ignore
    if(totalErreurs >= this.patient.getValue()?.getStat(this.patient.getValue()?.getStats()?.length-1)?.getErreurs()){
      this.progresErreurs = true;
    }else{
      this.progresErreurs = false;
    }

  }

  setUpTabIndices(){
    let grid = document.getElementById("tab-indices") as HTMLDivElement;
    let totalIndices = 0;

    // @ts-ignore

    for( let i =this.patient.getValue()?.getStats()?.length-1; i>=0;i--){
      let stats = this.patient.getValue()?.getStat(0);
      let stade = document.createElement('p');
      stade.innerHTML = "" + this.patient.getValue()?.stade;
      grid.append(stade);
      let date = document.createElement('p');
      let tmp : Date | undefined= this.patient.getValue()?.getStat(i)?.getDate();
      date.innerHTML = "" +tmp?.getDay() +"/"+ tmp?.getMonth() + "/" +tmp?.getFullYear();
      grid.append(date);
      let cartes = document.createElement('p');
      cartes.innerHTML = "" +this.patient.getValue()?.getStat(i)?.getNbCartes();
      grid.append(cartes);
      let indices = document.createElement('p');


      // @ts-ignore
      totalIndices += this.patient.getValue()?.getStat(i)?.getIndices();
      indices.innerHTML = ""  +this.patient.getValue()?.getStat(i)?.getIndices();
      grid.append(indices);

    }
    let moyenneIndices = document.getElementById("moyenne-indices") as HTMLParagraphElement;

    // @ts-ignore
    totalIndices = totalIndices/this.patient.getValue()?.getStats()?.length;
    moyenneIndices.innerHTML = ""+ Math.floor(totalIndices);

    // @ts-ignore
    if(totalIndices >= this.patient.getValue()?.getStat(this.patient.getValue()?.getStats()?.length-1)?.getIndices()){
      this.progresIndices = true;
    }else{
      this.progresIndices = false;
    }
  }
}
