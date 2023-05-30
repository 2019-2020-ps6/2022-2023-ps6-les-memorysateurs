import {BehaviorSubject, Subject, take} from "rxjs";
import {CompteUtilisateur} from "../../models/compte-utilisateur.models";
import {Injectable} from "@angular/core";
import {Theme} from "../../models/theme.models";

import { HttpClient } from '@angular/common/http';
import { GlobalsService } from "./globals.service";


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private users: CompteUtilisateur[] = [];

  public listeUtilisateurs$: BehaviorSubject<CompteUtilisateur[]> = new BehaviorSubject<CompteUtilisateur[]>([]);
  public utilisateurConnecte$: BehaviorSubject<CompteUtilisateur | undefined> = new BehaviorSubject<CompteUtilisateur | undefined>(undefined);


  public userSelected$: Subject<CompteUtilisateur> = new Subject();

  constructor(private http: HttpClient, private globals: GlobalsService) {
    this.retrieveUsers(globals.getURL() + "api/ergo");
  }

  retrieveUsers(url : string): void {
    this.http.get<CompteUtilisateur[]>(url).subscribe((userList) => {
      this.users = userList;
      this.listeUtilisateurs$.next(this.users);
    });
  }

  login(identifiant: string, motDePasse: string){
    console.log(identifiant);
    console.log(motDePasse);

    this.retrieveUsers(this.globals.getURL() + "api/ergo/" + identifiant + "/" + motDePasse + "/");


  }

  public addCompteUtilisateur(compteUtilisateur : CompteUtilisateur){
    let actualList = this.listeUtilisateurs$.asObservable();
    actualList.pipe(
      take(1)
    ).subscribe(liste =>{
      liste.push(compteUtilisateur);
      this.listeUtilisateurs$.next(liste);});

  }

  isAuthentifie(): boolean {
    return !(this.utilisateurConnecte$.getValue() == undefined);
  }
}
