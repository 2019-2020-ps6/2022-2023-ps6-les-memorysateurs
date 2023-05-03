import {BehaviorSubject, take} from "rxjs";
import {CompteUtilisateur} from "../../models/compte-utilisateur.models";
import {UTILISATEURS} from "../../moks/utilisateurs.moks";
import {Injectable} from "@angular/core";
import {Theme} from "../../models/theme.models";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public listeUtilisateurs$: BehaviorSubject<CompteUtilisateur[]> = new BehaviorSubject<CompteUtilisateur[]>(UTILISATEURS);
  public utilisateurConnecte$: BehaviorSubject<CompteUtilisateur | undefined> = new BehaviorSubject<CompteUtilisateur | undefined>(undefined);

  login(identifiant: string, motDePasse: string){
    console.log(identifiant);
    console.log(motDePasse);
    this.listeUtilisateurs$.getValue().forEach(utilisateur => {
      if((identifiant == utilisateur.identifiant) && (utilisateur.isCorrect(motDePasse))) this.utilisateurConnecte$.next(utilisateur);
    } );
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
