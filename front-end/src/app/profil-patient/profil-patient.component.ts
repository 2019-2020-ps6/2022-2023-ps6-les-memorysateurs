import { Component } from '@angular/core';
import {Patient} from "../../models/patient.models";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {PatientService} from "../services/patient.service";


@Component({
  selector: 'app-profil-patient',
  templateUrl: './profil-patient.component.html',
  styleUrls: ['./profil-patient.component.scss']
})
export class ProfilPatientComponent {
  public patient = this.patientService.patientSelectionne$;

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
  }

}
