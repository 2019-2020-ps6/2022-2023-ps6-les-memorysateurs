import {BehaviorSubject} from "rxjs";
import {CompteUtilisateur} from "../../models/compte-utilisateur.models";
import {UTILISATEURS} from "../../moks/utilisateurs.moks";

export class AuthentificationService {
  public listeUtilisateurs$: BehaviorSubject<CompteUtilisateur[]> = new BehaviorSubject<CompteUtilisateur[]>(UTILISATEURS);

  login(){

  }
}
