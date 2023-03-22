import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-creer-patient',
  templateUrl: './creer-patient.component.html',
  styleUrls: ['./creer-patient.component.scss']
})
export class CreerPatientComponent {
  public patientForm : FormGroup;
  public info = false;
  constructor(public formBuilder: FormBuilder) {
    this.patientForm = this.formBuilder.group({
      nom : [''],
      prenom : [''],
      stade : [3],
      photo : ['']
    });
  }
  ngOnInit(): void {}



afficherPhoto(){
    const input = document.getElementById("photo-button") as HTMLInputElement;
    const file = input.files?.[0];
    const stockImage = document.getElementById("affichage-photo") as HTMLImageElement;
    const reader = new FileReader();
    reader.onload = () => {
      stockImage.src = reader.result as string;
    }
    reader.readAsDataURL(file as Blob);


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
    console.log(this.patientForm.value);
}
creerProfilPatient(){
    console.log(this.patientForm.value);
  }
  changeInfoBooleen(){
    this.info = !this.info;
  }

}
