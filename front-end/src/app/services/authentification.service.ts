import {BehaviorSubject, Subject, take} from "rxjs";
import {CompteUtilisateur} from "../../models/compte-utilisateur.models";
import {Injectable} from "@angular/core";
import {Theme} from "../../models/theme.models";

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { GlobalsService } from "./globals.service";


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private user?: CompteUtilisateur;

  inConnect: boolean = false;

  public inConnect$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.inConnect);

  public utilisateurConnecte$: BehaviorSubject<CompteUtilisateur | undefined> = new BehaviorSubject<CompteUtilisateur | undefined>(undefined);


  constructor(private http: HttpClient, private globals: GlobalsService) {
    let userStore = localStorage.getItem("user");
    if(userStore != null){
      let userJSON = JSON.parse(userStore);
      let compte = new CompteUtilisateur(userJSON.name, userJSON.email, userJSON.password, userJSON.id);
      this.utilisateurConnecte$.next(compte);
    }
    this.utilisateurConnecte$.subscribe((user) => {
      if(user != undefined){
        this.inConnect = true;
        localStorage.setItem("user", JSON.stringify(user));
      }
    });
    this.inConnect$.next(this.isConnected());
  }




  retrieveUser(url : string): boolean {
    this.http.get<CompteUtilisateur>(url).subscribe((userList) => {
      this.user = userList;
      if(this.user != undefined){
        console.log(this.user);
        this.utilisateurConnecte$.next(this.user);
        console.log(this.utilisateurConnecte$.getValue());
        this.inConnect$.next(this.isConnected());
      }//TODO: error
    });
    return (this.user != undefined);
  }

  login(identifiant: string, motDePasse: string) : boolean {
    console.log(identifiant);
    console.log(motDePasse);

    return this.retrieveUser(this.globals.getURL() + "api/ergo/" + identifiant + "/" + motDePasse + "/");
  }

  addCompteUtilisateur(user: CompteUtilisateur): boolean {
    
    let body = JSON.stringify( user );
    console.log(body);
    console.log(user);        
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    this.http.post<CompteUtilisateur>(this.globals.getURL() + "api/ergo/", body, options).subscribe((us) => {
      this.user = us;
      if(this.user != undefined){
        console.log(this.user);
        this.utilisateurConnecte$.next(this.user);
        console.log(this.utilisateurConnecte$.getValue());
        this.inConnect$.next(this.isConnected());
      }
    });
    return (this.user != undefined);
  }
  
  logout(){
    this.user=undefined;
    this.utilisateurConnecte$.next(undefined);
    localStorage.removeItem("user");
    localStorage.removeItem("patient");
    this.inConnect$.next(this.isConnected());
  }

  public getValue(){
    return this.utilisateurConnecte$.getValue();
  }


  isAuthentifie(): boolean {
    return (this.utilisateurConnecte$.getValue() != undefined);
  }

  isConnected(): boolean {
    return localStorage.getItem("user") != null;
  }
}
