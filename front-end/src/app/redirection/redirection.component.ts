import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthentificationService} from "../services/authentification.service";

@Component({
  selector: 'app-redirection',
  templateUrl: './redirection.component.html',
  styleUrls: ['./redirection.component.scss']
})
export class RedirectionComponent {

  constructor(public router : Router,public authentificationService : AuthentificationService){

  }

  ngOnInit(){
    if(this.authentificationService.inConnect$.value){
      this.router.navigate(['/liste-patient']);
    }else{
      this.router.navigate(['/authentification']);
    }
  }
}
