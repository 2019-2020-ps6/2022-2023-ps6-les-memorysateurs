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

  private user?: CompteUtilisateur;

  public utilisateurConnecte$: BehaviorSubject<CompteUtilisateur | undefined> = new BehaviorSubject<CompteUtilisateur | undefined>(undefined);

  public userSelected$: Subject<CompteUtilisateur> = new Subject();



  constructor(private http: HttpClient, private globals: GlobalsService) {
  }




  retrieveUser(url : string): boolean {
    this.http.get<CompteUtilisateur>(url).subscribe((userList) => {
      this.user = userList;
      if(this.user != undefined){
        console.log(this.user);
        this.utilisateurConnecte$.next(this.user);
        console.log(this.utilisateurConnecte$.getValue());
      }//TODO: error
    });
    return (this.user != undefined);
  }

  login(identifiant: string, motDePasse: string) : boolean {
    console.log(identifiant);
    console.log(motDePasse);

    return this.retrieveUser(this.globals.getURL() + "api/ergo/" + identifiant + "/" + motDePasse + "/");


  }

  
  logout(){
    this.user=undefined;
    this.utilisateurConnecte$.next(undefined);

  }

  public getValue(){
    return this.utilisateurConnecte$.getValue();
  }

  public addCompteUtilisateur(compteUtilisateur : CompteUtilisateur){
    // actualList.pipe(
    //   take(1)
    // ).subscribe(liste =>{
    //   liste.push(compteUtilisateur);
    //   this.listeUtilisateurs$.next(liste);});

  }

  isAuthentifie(): boolean {
    return (this.utilisateurConnecte$.getValue() != undefined);
  }
}
