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


    this.authentificationService.inConnect$.subscribe(c => {
      if(c){
        this.router.navigate(['/liste-patient']);
        this.authentificationService.inConnect$.next(false);
      }
    });
  }

  /*
  Ces fonctions servent simplement à se souvenir qu'il faudra les implémenter dans la partie backend
   */

  onValider() {
    console.log(this.formGroup);
    if(this.formGroup.get('motDePasse')?.value == this.formGroup.get('confirmerMotDePasse')?.value && this.formGroup.get('motDePasse')?.value != null) {
      this.authentificationService.addCompteUtilisateur(new CompteUtilisateur(this.formGroup.value['identifiant'],
        this.formGroup.value['adresseEmail'], this.formGroup.value['motDePasse']));
    }else if(this.formGroup.get('motDePasse')?.value ==null || this.formGroup.get('confirmerMotDePasse')?.value == null||
      this.formGroup.get('identifiant')?.value == null|| this.formGroup.get('adresseEmail')?.value == null){
      alert("Veuillez remplir tous les champs.");
    }
    else {
      alert("Votre mot de passe est différent entre le champ Mot de passe et le champ de confirmation.")
    }
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
