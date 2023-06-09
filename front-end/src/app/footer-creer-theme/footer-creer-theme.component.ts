import {Component, OnInit, AfterViewInit, Output, EventEmitter, Input} from '@angular/core';
import { Router } from '@angular/router';
import {FormThemeService} from "../services/formTheme.service";
import {Theme} from "../../models/theme.models";
import {ThemeService} from "../services/theme.service";
import {Patient} from "../../models/patient.models";
import {PatientService} from "../services/patient.service";


@Component({
  selector: 'app-footer-creer-theme',
  templateUrl: './footer-creer-theme.component.html',
  styleUrls: ['./footer-creer-theme.component.scss']
})
export class FooterCreerThemeComponent implements OnInit,AfterViewInit{
  // @ts-ignore
  nom : string ="";
  // @ts-ignore
  images : any[]= [];
  @Input()
  theme : Theme |undefined;
  @Output()
  erreur : EventEmitter<boolean> = new EventEmitter<boolean>();
  bas_jaune : boolean = true;
  supprimer : boolean = false;
  constructor(private router: Router,public formThemeService: FormThemeService,private themeService : ThemeService,private patientService :PatientService) {

  }
  ngOnInit(): void {
    this.formThemeService.nomSubject$.subscribe(nom => {
     this.nom = nom;

    });
    this.formThemeService.imageSubject$.subscribe(images => {
      this.images = images;
    });

  }
  retourListeTheme() {
    this.themeService.setEditTheme(undefined);
    this.router.navigateByUrl("liste-theme");
  }

  ajouterTheme(){
    let ajout : boolean = false;
  if(this.theme == undefined) {

    const theme: Theme = new Theme(this.nom, this. images)
    this.theme = theme;
    ajout = true;
  }
    else{
      this.theme.titre = this.nom;
    this.theme.images = this.images;
    ajout = false;
    }

    if ((this.theme.titre != "") && this.theme.images.length >=4) {
      this.erreur.emit(false);
      if(ajout) {
        this.themeService.addTheme(this.theme);
      }
      this.router.navigate(['/liste-theme']);
    } else {
      this.erreur.emit(true);
      this.theme = undefined;
    }
    this.themeService.setEditTheme(undefined);
  }

  clickPartagerOuSupprimer(){
    if(this.supprimer) {
      let bool = confirm('Êtes-vous sûr de vouloir supprimer ce thème ?');
      if(bool) {
        this.themeService.removeTheme(this.theme);
        this.themeService.setEditTheme(undefined);
        const patient = this.patientService.patientSelectionne$;
        let patientSelect: Patient = this.patientService.getPatientById(patient.value?.id as number);
        patientSelect.setThemes(this.themeService.listeThemes$.value);

        this.router.navigate(['/liste-theme']);
      }
    }
    if(this.bas_jaune){
      this.router.navigate(['/partager-theme']);
    }
  }

  ngAfterViewInit(): void {
    const bouton = document.getElementById("boutonChangeant") as HTMLButtonElement;
    if(this.theme == undefined){
      this.bas_jaune = true;
      this.supprimer = false;
      bouton.innerHTML = "Partager la Création";
    }else{
      this.bas_jaune = false;
      this.supprimer = true;
      bouton.innerHTML = "Supprimer";
    }
  }
}
