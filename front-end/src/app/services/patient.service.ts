import {Injectable} from "@angular/core";
import {BehaviorSubject, take} from "rxjs";
import {Patient} from "../../models/patient.models";
import {LISTE_PATIENT} from "../../moks/liste-patient.moks";
import {Theme} from "../../models/theme.models";
import {AuthentificationService} from "./authentification.service";
import {HttpClient} from "@angular/common/http";
import {GlobalsService} from "./globals.service";

@Injectable({
  providedIn: 'root'
})

export class PatientService {
  private listePatient: Patient[] = [];
  public listePatient$: BehaviorSubject<Patient[] | undefined> = new BehaviorSubject<Patient[] | undefined>(this.listePatient);
  private patientSelectionne: Patient | undefined = undefined;
  public patientSelectionne$: BehaviorSubject<Patient | undefined> = new BehaviorSubject<Patient | undefined>(this.patientSelectionne);
  public patientEdite$: BehaviorSubject<Patient | undefined> = new BehaviorSubject<Patient | undefined>(undefined);

  constructor(private http: HttpClient, private globals: GlobalsService, private authentificationService: AuthentificationService) {
    this.listePatient$.next(this.listePatient);

    let patientStore = localStorage.getItem("patient");

    if(patientStore != null){
      let patientJSON = JSON.parse(patientStore);
      let patient = new Patient(patientJSON.nom, patientJSON.prenom, patientJSON.photo, patientJSON.stade, patientJSON.ergoId, patientJSON.id);
      this.patientSelectionne$.next(patient);
    }

    authentificationService.utilisateurConnecte$.subscribe(user => {
      if (user != undefined) {
        this.retrievePatient(this.globals.getURL() + "api/patient?ergoId=" + user.id);
      }
    });

    this.listePatient$.subscribe(liste => {
      if (liste != undefined) {
        liste.reverse();
        this.listePatient = liste;
      }
    });

    this.patientSelectionne$.subscribe(patient => {
      if (patient != undefined) {
        localStorage.setItem("patient", JSON.stringify(patient));
        this.patientSelectionne = patient;
      }
    });

    this.patientEdite$.subscribe(patient => {
      if (patient != undefined) {
        this.patientSelectionne = patient;
      }
    });

  }

  get(i : number) {
    return this.listePatient[i];
  }

  setEditPatient(patient : Patient | undefined){
    this.patientEdite$.next(patient);
  }

  public getPatientById(id : number): Patient{
    let patientById: Patient = this.listePatient[0];
    this.listePatient.forEach(patient => {
      if(patient.id === id) patientById = patient;
    })
    return patientById;
  }

  retrievePatient(url : string) {
    this.listePatient = [];
    this.listePatient$.next(this.listePatient);
    this.http.get<Patient[]>(url).subscribe((patientList) => {
      patientList.forEach(p => {
        let patient = new Patient(p.nom, p.prenom, p.photo, p.stade, p.ergoId, p.id);
        this.listePatient.push(patient);
      });
      if(this.listePatient != undefined){
        console.log(this.listePatient);
        this.listePatient$.next(this.listePatient);
        console.log(this.listePatient$.getValue());
      }//TODO: error
    });
  }

  addPatient(patient : Patient){
    let ergoId = this.authentificationService.utilisateurConnecte$.getValue()?.id;
    if(ergoId == undefined) return;
    patient.ergoId = ergoId;
    let url = this.globals.getURL() + "api/patient";
    this.http.post<Patient>(url + "?ergoId="+ergoId, patient).subscribe((p) => {

      let patient = new Patient(p.nom, p.prenom, p.photo, p.stade, p.ergoId, p.id);
      this.listePatient.reverse().push(patient);
      this.listePatient$.next(this.listePatient);
    });
  }

  public updateTheme(patient : Patient){
    this.http.put<Patient>(this.globals.getURL() + "api/patient/" + patient.getID(), patient).subscribe((patient) => {
      this.listePatient.forEach((p, i) => {
        if(p.id === patient.id) {
          this.listePatient[i] = new Patient(p.nom, p.prenom, p.photo, p.stade, p.ergoId, p.id);
          this.listePatient$.next(this.listePatient);
          this.patientEdite$.next(this.listePatient[i]);
        }
      });
    });
  }

  public removePatient(patient : Patient | undefined){
    if(patient == undefined) return;
    this.http.delete<Patient[]>(this.globals.getURL() + "api/patient/" + patient.id + "?ergoId="+ this.authentificationService.getValue()?.id).subscribe((patientList) => {
      this.listePatient = [];
      patientList.forEach(p => {
        this.listePatient.push(new Patient(p.nom, p.prenom, p.photo, p.stade, p.ergoId, p.id));
      });
      this.listePatient$.next(this.listePatient);
      this.patientEdite$.next(undefined);
    });
  }
}


