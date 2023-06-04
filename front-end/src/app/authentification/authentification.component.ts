import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";
import {ThemeService} from "../services/theme.service";

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent {
  formGroup!: FormGroup;

  constructor(public formBuilder: FormBuilder, public router: Router, public authentificationService : AuthentificationService ) {
    this.formGroup = this.formBuilder.group({
      identifiant: [null],
      motDePasse: [null]
      });
    this.authentificationService.utilisateurConnecte$.subscribe(user => {
      if(user != undefined){
        this.router.navigate(['/liste-patient']);
      }
    });
  }

  onLogin(){
    this.authentificationService.login(this.formGroup.value['identifiant'], this.formGroup.value['motDePasse']);
    console.log(this.authentificationService.utilisateurConnecte$);
  }


}
