import {Injectable} from "@angular/core";
import {BehaviorSubject, take} from "rxjs";
import {Patient} from "../../models/patient.models";
import {LISTE_PATIENT} from "../../moks/liste-patient.moks";
import {Theme} from "../../models/theme.models";
import {AuthentificationService} from "./authentification.service";

@Injectable({
  providedIn: 'root'
})

export class PatientService {
  public listePatient$: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>(LISTE_PATIENT);
    public patientSelectionne$: BehaviorSubject<Patient | undefined> = new BehaviorSubject<Patient | undefined>(LISTE_PATIENT[0]);
  public patientEdite$: BehaviorSubject<Patient | undefined> = new BehaviorSubject<Patient | undefined>(undefined);



  public addPatient(patient : Patient){
    let actualList = this.listePatient$.asObservable();
    actualList.pipe(
      take(1)
    ).subscribe(liste =>{
      liste.push(patient);
      this.listePatient$.next(liste);});

  }
  get(i : number) {
    return this.listePatient$.getValue()[i];
  }

  setEditPatient(patient : Patient | undefined){
    this.patientEdite$.next(patient);
  }

  removePatient(patient : Patient | undefined){
    let actualList = this.listePatient$.asObservable();
    let listeA : Patient[] = [];
    actualList.pipe(
      take(1)
    ).subscribe(liste =>{
      liste.forEach(chaine =>{
        if(chaine != patient){
          listeA.push(chaine);
        }
      })
    });
    this.listePatient$.next(listeA);
  }

  public getPatientById(id : number): Patient{
    let patientById: Patient = this.listePatient$.getValue()[0];
    this.listePatient$.getValue().forEach(patient => {
      if(patient.id === id) patientById = patient;
    })
    return patientById;
  }
}
