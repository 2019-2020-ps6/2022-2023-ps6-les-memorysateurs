import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthentificationService} from "../services/authentification.service";
import {CompteUtilisateur} from "../../models/compte-utilisateur.models";

@Component({
  selector: 'app-creer-compte',
  templateUrl: './creer-compte.component.html',
  styleUrls: ['./creer-compte.component.scss']
})
export class CreerCompteComponent {
  formGroup!: FormGroup;

  constructor(public formBuilder: FormBuilder, public router: Router, public authentificationService : AuthentificationService ) {
    this.formGroup = this.formBuilder.group({
      identifiant: [null],
      adresseEmail: [null],
      motDePasse: [null],
      confirmerMotDePasse: [null]
    });
  }

  /*
  Ces fonctions servent simplement à se souvenir qu'il faudra les implémenter dans la partie backend
   */

  onValider() {
    this.authentificationService.addCompteUtilisateur(new CompteUtilisateur(0,this.formGroup.value['identifiant'],
      this.formGroup.value['email'], this.formGroup.value['motDePasse']));
  }

  isValidEmail(str: string): boolean {
    return true;
  }

  isValidIdentifiant(str: string): boolean {
    return true;
  }

  isValidMotDePasse(str: string): boolean {
    return true;
  }

  isValidConfirmerMotDePasse(str: string): boolean {
    return str === this.formGroup.value['motDePasse'];
  }
}
