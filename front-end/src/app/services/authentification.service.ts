import {BehaviorSubject} from "rxjs";
import {CompteUtilisateur} from "../../models/compte-utilisateur.models";
import {UTILISATEURS} from "../../moks/utilisateurs.moks";
import {Injectable} from "@angular/core";

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

  isAuthentifie(): boolean {
    return !(this.utilisateurConnecte$.getValue() == undefined);
  }
}
