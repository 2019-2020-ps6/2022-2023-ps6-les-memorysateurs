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
  }

  onLogin(){
    this.authentificationService.login(this.formGroup.value['identifiant'], this.formGroup.value['motDePasse']);
    if(this.authentificationService.isAuthentifie()) this.router.navigateByUrl('liste-patient');
  }
}
