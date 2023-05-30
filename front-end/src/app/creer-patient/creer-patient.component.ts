import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Theme} from "../../models/theme.models";
import {Patient} from "../../models/patient.models";
import {PatientService} from "../services/patient.service";
import {Router} from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import {AuthentificationService} from "../services/authentification.service";

@Component({
  selector: 'app-creer-patient',
  templateUrl: './creer-patient.component.html',
  styleUrls: ['./creer-patient.component.scss']
})
export class CreerPatientComponent {
  public patient : Patient |undefined;
  public patientForm : FormGroup;
  public info = false;

  @Input()
  erreurNom = false;
  @Input()
  erreurPrenom = false;
  @Input()
  erreurPhoto = false;


  popup=false;
  constructor(private router: Router,public formBuilder: FormBuilder,private patientService : PatientService) {
    this.patientForm = this.formBuilder.group({
      nom : [''],
      prenom : [''],
      stade : [3],
      photo : ['']
    });
  }
  ngOnInit(): void {
    this.remplirData();
    if(this.patient != undefined){
      const titre = document.getElementById("text-nouveau-profil") as HTMLParagraphElement;
      titre.innerHTML = "MODIFIER LE PROFIL";
    }
  }



afficherPhoto(){
    const input = document.getElementById("photo-button") as HTMLInputElement;
    const file = input.files?.[0];
    const stockImage = document.getElementById("affichage-photo") as HTMLImageElement;
    const reader = new FileReader();
    reader.onload = () => {
      stockImage.src = reader.result as string;
    }
    reader.readAsDataURL(file as Blob);
  this.erreurPhotoDisable();

  }
  setStade(){
    const stade3 = document.getElementById("radio1") as HTMLInputElement;
    const stade4 = document.getElementById("radio2") as HTMLInputElement;
    const stade5 = document.getElementById("radio3") as HTMLInputElement;
    if(stade3.checked)
      this.patientForm.value.stade = 3;
    else if(stade4.checked)
      this.patientForm.value.stade = 4;
    else if(stade5.checked)
      this.patientForm.value.stade = 5;
  }

retour(){
  this.patientService.setEditPatient(undefined);
  window.history.back();
}
creerProfilPatient(){

  let ajout : boolean = false;
  let erreur = false;
  const image = document.getElementById("affichage-photo") as HTMLImageElement;
  if(this.patientForm.value['nom'] == "" || this.patientForm.value['prenom'] == ""  ||image.src ==''){
    erreur = true;
    this.afficherErreur(erreur);
  }
if(!erreur) {
  if (this.patient == undefined) {
    const patient: Patient = new Patient(this.patientForm.value['nom'], this.patientForm.value['prenom'], image.src, this.patientForm.value['stade'],undefined,undefined, 0);
    this.patient = patient;
    ajout = true;
  } else {
    this.patient.nom = this.patientForm.value['nom'];
    this.patient.prenom = this.patientForm.value['prenom'];
    this.patient.photo = image.src;
    this.patient.stade = this.patientForm.value['stade'];
    ajout = false;
  }
      if (ajout) {
      this.patientService.addPatient(this.patient);
    }
    this.router.navigate(['/liste-patient']);

  this.patientService.setEditPatient(undefined);
}
}
afficherErreur(erreur : boolean){

if(this.patientForm.value['nom']==''){
  const nom = document.getElementById("input-nom") as HTMLInputElement;
  nom.style.background = "#F00000";
  nom.style.opacity = "0.5";
  this.erreurNom = erreur;
}else{
  this.erreurNomDisable();
}
  if(this.patientForm.value['prenom']==''){
    const prenom = document.getElementById("input-prenom") as HTMLInputElement;
    prenom.style.background = "#F00000";
    prenom.style.opacity = "0.5";
    this.erreurPrenom = erreur;
  }else{
   this.erreurPrenomDisable();
  }
  const image = document.getElementById("affichage-photo") as HTMLImageElement;
  if(image.src ==''){
    image.style.background = "#F00000";
    image.style.opacity = "0.5";
    this.erreurPhoto = erreur;
  }else{
    this.erreurPhotoDisable();
  }
  this.popup = erreur;
}


  changeInfoBooleen(){
    this.info = !this.info;
  }

 remplirData() : void{
    this.patient = this.patientService.patientEdite$.value;;
    if(this.patient != undefined){
      this.patientForm = this.formBuilder.group({
        nom : [this.patient.nom],
        prenom : [this.patient.prenom],
        stade : [this.patient.stade],
        photo : [this.patient.photo]
      });
      const image = document.getElementById("affichage-photo") as HTMLImageElement;
      image.src = this.patient.photo;
      const radio1 = document.getElementById("radio1") as HTMLInputElement;
      const radio2 = document.getElementById("radio2") as HTMLInputElement;
      const radio3 = document.getElementById("radio3") as HTMLInputElement;

      switch (this.patient.stade){
        case 5 :
          radio3.checked = true;
          break;
        case 3 :
          radio1.checked = true;
          break;
        case 4 :
          radio2.checked = true;
          break;
        default :
          console.log("erreur : " + this.patient.stade);
          break;
      }
    }

  }
  supprimerPatient(){
    let bool = confirm('Êtes-vous sûr de vouloir supprimer ce patient ?');
    if(bool) {
      this.patientService.removePatient(this.patient);
      this.patientService.setEditPatient(undefined);
      this.router.navigate(['/liste-patient']);
    }
  }
  popupChange(value : boolean){
    this.popup = value;
  }

  erreurNomDisable(){
    const nom = document.getElementById("input-nom") as HTMLInputElement;
    nom.style.background = "#FFFFFF";
    nom.style.opacity = "1";
    this.erreurNom = false;
  }
  erreurPrenomDisable(){
    const prenom = document.getElementById("input-prenom") as HTMLInputElement;
    prenom.style.background = "#FFFFFF";
    prenom.style.opacity = "1";
    this.erreurPrenom = false;
  }

  erreurPhotoDisable(){
    const image = document.getElementById("affichage-photo") as HTMLImageElement;
    image.style.background = "#FFFFFF";
    image.style.opacity = "1";
    this.erreurPhoto = false;
  }
}
