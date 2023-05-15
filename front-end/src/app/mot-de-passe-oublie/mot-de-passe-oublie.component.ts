import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthentificationService} from "../services/authentification.service";

@Component({
  selector: 'app-mot-de-passe-oublie',
  templateUrl: './mot-de-passe-oublie.component.html',
  styleUrls: ['./mot-de-passe-oublie.component.scss']
})
export class MotDePasseOublieComponent {
  formGroup!: FormGroup;

  constructor(public formBuilder: FormBuilder, public router: Router ) {
    this.formGroup = this.formBuilder.group({
      identifiant: [null]
    });
  }

  onValider() {
  }

  onRetour() {
    this.router.navigateByUrl('authentification')
  }
}
