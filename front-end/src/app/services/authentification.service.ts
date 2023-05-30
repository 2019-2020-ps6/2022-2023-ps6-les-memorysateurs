import {BehaviorSubject, Subject, take} from "rxjs";
import {CompteUtilisateur} from "../../models/compte-utilisateur.models";
import {UTILISATEURS} from "../../moks/utilisateurs.moks";
import {Injectable} from "@angular/core";
import {Theme} from "../../models/theme.models";
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from "./globals.service";


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private users: CompteUtilisateur[] = [];

  public listeUtilisateurs$: BehaviorSubject<CompteUtilisateur[]> = new BehaviorSubject<CompteUtilisateur[]>(UTILISATEURS);
  public utilisateurConnecte$: BehaviorSubject<CompteUtilisateur | undefined> = new BehaviorSubject<CompteUtilisateur | undefined>(undefined);

  public userSelected$: Subject<CompteUtilisateur> = new Subject();

  private userUrl = serverUrl + '/users';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.http.get<CompteUtilisateur[]>(this.userUrl).subscribe((userList) => {
      this.users = userList;
      this.listeUtilisateurs$.next(this.users);
    });
  }

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
