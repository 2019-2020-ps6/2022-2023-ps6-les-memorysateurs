import {Component, Input} from '@angular/core';
import {Cardable} from "../../models/cardable.models";
import {Router} from "@angular/router";
import {ThemeService} from "../services/theme.service";
import {PatientService} from "../services/patient.service";
import {Theme} from "../../models/theme.models";
import {Patient} from "../../models/patient.models";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-partager-theme',
  templateUrl: './partager-theme.component.html',
  styleUrls: ['./partager-theme.component.scss']
})
export class PartagerThemeComponent {
  public messageForm : FormGroup;

  public patient = this.patientService.patientSelectionne$;
  public partiesJouees: number = 0;
  public nom: string = "";
  public prenom: string = "";
  public stockImage: string = "";
  public stade: string = "";

  @Input()
  erreurMessage = false;
  @Input()
  erreurTelephone = false;


  popup=false;

  constructor(public router: Router,public formBuilder: FormBuilder,public patientService : PatientService,public themeService : ThemeService) {

    this.messageForm = this.formBuilder.group({
      telephone : [''],
      message : ['']
    });

  }

  ngOnInit(): void {
    this.nom = this.patient.value?.nom as string;
    this.prenom = this.patient.value?.prenom as string;
    this.stockImage = this.patient.value?.photo as string;
    this.stade = "Stade " + this.patient.value?.stade as string;
  }

  retour(){
    this.themeService.setEditTheme(undefined);
    window.history.back();
  }

  envoyer(){
    this.verifierErreur();
    if(!this.popup)
      console.log("Tel : " + this.messageForm.value.telephone +  "\n message : " + this.messageForm.value.message);
  }

  verifierErreur(){
    if(this.messageForm.value.telephone.length != 10){
    this.erreurTelephone = true;
    let tel = document.getElementById("input-tel") as HTMLDivElement;
    tel.style.background = "#F00000";
    tel.style.opacity = "0.5";
    }else{
      this.erreurTelDisable();
    }
    if(this.messageForm.value.message.length ==0){
      this.erreurMessage = true;
      let msg = document.getElementById("input-msg") as HTMLTextAreaElement;
      msg.style.background = "#F00000";
      msg.style.opacity = "0.5";
    }
    else{
      this.erreurMsgDisable();
    }
    this.popup = this.erreurMessage ||this.erreurTelephone;
  }
  changerPatient(){
    this.router.navigate(['/liste-patient']);
  }
  popupChange(value : boolean){
    this.popup = value;
  }
  erreurTelDisable(){
    let tel = document.getElementById("input-tel") as HTMLDivElement;
    this.erreurTelephone = false;
    tel.style.background = "#FFFFFF";
    tel.style.opacity = "1";
  }

  erreurMsgDisable(){
    let msg = document.getElementById("input-msg") as HTMLDivElement;
    this.erreurMessage = false;
    msg.style.background = "#FFFFFF";
    msg.style.opacity = "1";
  }
}
