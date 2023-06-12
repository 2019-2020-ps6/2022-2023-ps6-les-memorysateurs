import { Injectable } from '@angular/core';
import {Theme} from "../../models/theme.models";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GlobalsService} from "./globals.service";
import {PatientService} from "./patient.service";
import {Statistiques} from "../../models/statistiques.models";

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {
  private statistiques: Statistiques[] = []
  public listeStatistiques$: BehaviorSubject<Statistiques[] | undefined> = new BehaviorSubject<Statistiques[] | undefined>(this.statistiques);


  constructor(private http: HttpClient, private globals: GlobalsService, public patientService: PatientService) {
    patientService.patientSelectionne$.subscribe(patient => {
      if (patient != undefined) {
        this.retrieveStatistiques(globals.getURL() + "api/Statistiques?patientId=" + patient.id);
      }
    });

    this.listeStatistiques$.subscribe(liste => {
        if (liste != undefined) {
          this.statistiques = liste;
        }
      }
    );
  }


  retrieveStatistiques(url: string): void {
    this.statistiques = [];
    this.listeStatistiques$.next(this.statistiques);
    this.http.get<Statistiques[]>(url).subscribe((statistiques) => {
      statistiques.forEach(statistique => {
        this.statistiques.push(new Statistiques(statistique.getTemps(), statistique.getEssais(), statistique.getErreurs(), statistique.getIndices(), statistique.getDate(), statistique.getNbCartes(), statistique.getStade()));
      });
      this.listeStatistiques$.next(this.statistiques);
    });
  }



  public setStatistiques(statistiques : Statistiques[]|undefined){
    if(statistiques!=undefined) {
      this.listeStatistiques$.next(statistiques);
    }
  }

  public addStatistiques(statistiques : Statistiques){
    let patientId = this.patientService.patientSelectionne$.getValue()?.id;
    this.http.post<Statistiques>(this.globals.getURL() + "api/theme?patientId=" + patientId, statistiques).subscribe(
      (statistique) => {
      this.statistiques.push(new Statistiques(statistique.getTemps(), statistique.getEssais(), statistique.getErreurs(), statistique.getIndices(), statistique.getDate(), statistique.getNbCartes(), statistique.getStade()));
      this.listeStatistiques$.next(this.statistiques);
    });
  }

}
