import { Component } from '@angular/core';
import {Cardable} from "../../models/cardable.models";
import {Router} from "@angular/router";
import {ThemeService} from "../services/theme.service";
import {Theme} from "../../models/theme.models";
import {Patient} from "../../models/patient.models";
import {PatientService} from "../services/patient.service";

@Component({
  selector: 'app-liste-patient',
  templateUrl: './liste-patient.component.html',
  styleUrls: ['./liste-patient.component.scss']
})
export class ListePatientComponent {
  listePatient: Cardable[] = [];

  constructor(public router: Router, public patientService: PatientService) {
    this.patientService.listePatient$.subscribe((patients: Patient[]) => {
      this.listePatient = patients;
    });
  }

  onSelectionner(id : number){
    let patientSelectionne: Patient = this.patientService.getPatientById(id);
    this.patientService.patientSelectionne$.next(patientSelectionne);
    this.router.navigateByUrl('profil-patient');
  }

  onEditer(id : number){
    let patientEdite: Patient = this.patientService.getPatientById(id);
    this.patientService.patientEdite$.next(patientEdite);
    this.router.navigateByUrl('creer-patient');
  }

  onAjouterPatient(){
    this.router.navigateByUrl('creer-patient')
  }
}
