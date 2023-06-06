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

    authentificationService.utilisateurConnecte$.subscribe(user => {
      if (user != undefined) {
        this.retrievePatient(this.globals.getURL() + "api/patient/?ergoId=" + user.id);
      }
    });

    this.listePatient$.subscribe(liste => {
      if (liste != undefined) {
        this.listePatient = liste;
      }
    });

    this.patientSelectionne$.subscribe(patient => {
      if (patient != undefined) {
        this.patientSelectionne = patient;
      }
    });

    this.patientEdite$.subscribe(patient => {
      if (patient != undefined) {
        this.patientSelectionne = patient;
      }
    });

  }


  // public addPatient(patient : Patient){
  //   let actualList = this.listePatient$.asObservable();
  //   actualList.pipe(
  //     take(1)
  //   ).subscribe(liste =>{
  //     this.listePatient.push(patient);
  //     this.listePatient$.next(liste);});

  // }
  get(i : number) {
    return this.listePatient[i];
  }

  setEditPatient(patient : Patient | undefined){
    this.patientEdite$.next(patient);
  }

  // removePatient(patient : Patient | undefined){
  //   let actualList = this.listePatient$.asObservable();
  //   let listeA : Patient[] = [];
  //   actualList.pipe(
  //     take(1)
  //   ).subscribe(liste =>{
  //     this.listePatient.forEach(chaine =>{
  //       if(chaine != patient){
  //         listeA.push(chaine);
  //       }
  //     })
  //   });
  //   this.listePatient$.next(listeA);
  // }

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
    let url = this.globals.getURL() + "api/patient/";
    this.http.post<Patient>(url, patient).subscribe((patient) => {
      this.listePatient.push(patient);
      this.listePatient$.next(this.listePatient);
    });
  }

  removePatient(patient : Patient | undefined){
    if(patient == undefined) return;
    let url = this.globals.getURL() + "api/patient/" + patient.id;
    this.http.delete<Patient>(url).subscribe((patient) => {
      let listeA : Patient[] = [];
      this.listePatient.forEach(chaine =>{
        if(chaine != patient){
          listeA.push(chaine);
        }
      })
      this.listePatient$.next(listeA);
    });
  }
}


