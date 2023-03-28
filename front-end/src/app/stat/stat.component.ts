import { Component, OnInit } from '@angular/core';
import {Patient} from "../../models/patient.models";
import {PatientService} from "../services/patient.service";

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
  public patient: Patient | undefined;
  public tempsDeJeu: number = 0;
  public nbEssai: number = 0;
  public nbErreur: number = 0;
  public nbIndices: number = 0;

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patient = this.patientService.patientSelectionne$.value;
    // On remplit des données pour l'exemple
    this.tempsDeJeu = Math.floor(Math.random() * 1000);
    this.nbEssai = Math.floor(Math.random() * 50);
    this.nbErreur = Math.floor(Math.random() * 10);
    this.nbIndices = Math.floor(Math.random() * 20);
  }

}