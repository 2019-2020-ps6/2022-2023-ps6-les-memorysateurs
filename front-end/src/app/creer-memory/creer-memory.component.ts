import { Component, ViewChild, Query, OnInit } from '@angular/core';
import {Theme} from "../../models/theme.models";
import {ThemeService} from "../services/theme.service";
import {Router} from "@angular/router";
import {GameService} from "../services/game.service";
import {PatientService} from "../services/patient.service";
@Component({
  selector: 'app-creer-memory',
  templateUrl: './creer-memory.component.html',
  styleUrls: ['./creer-memory.component.scss']
})
export class CreerMemoryComponent implements OnInit {
  themeSelectionne! : Theme;
  //temps
  min: number = 5;
  max = 60;

  numberOfCards = [4, 6, 8];
  numberOfCardsTips : number[]= [];
  numberOfErrors = [1,2,3,4];
  numberRecc = [2,3,4,5,6];

  //paramètres
  nombreCarte!: number;
  nombreCartesIndice!: number;
  dureeIndice!: number;
  timerEnabled!: boolean;


  constructor(public router: Router, public themeService: ThemeService, public gameService: GameService,public patientService : PatientService) {

    gameService.nombreCartes$.subscribe((nombreCarte: number) => {
      this.nombreCarte = nombreCarte;
      let nbCardsForTips = nombreCarte/2;
      this.numberOfCardsTips = [1];
      for (let i = 1; i < nbCardsForTips; i++) {
        this.numberOfCardsTips.push(i+1);
      }
      if(this.nombreCartesIndice >= nbCardsForTips) {
        gameService.nombreCartesIndice$.next(this.numberOfCardsTips[this.numberOfCardsTips.length-1]);
      }
    })

    gameService.nombreCartesIndice$.subscribe((nombreCartesIndice: number) => {
      this.nombreCartesIndice = nombreCartesIndice;
    })

    gameService.dureeIndice$.subscribe((dureeIndice: number) => {
      this.dureeIndice = dureeIndice;
    })

    gameService.timerEnabled$.subscribe((timerEnabled: boolean) => {
      this.timerEnabled = timerEnabled;
    })

    themeService.themeSelectionne$.subscribe((theme) => {
      if(theme != undefined) {
        this.themeSelectionne = theme;
      }
    })

  }
  ngOnInit(): void {
  }

  onValueTimeChange(newDuration : number) {
    this.gameService.dureeIndice$.next(newDuration);
  }

  onNbCarteChange(value: number){
    this.gameService.nombreCartes$.next(value);
  }

  onNbCardTipsChange(value : number) {
  }

  lancerPartie(){
    this.router.navigateByUrl("game");
  }

  onChangerTheme() {
    this.router.navigateByUrl("liste-theme");
  }

  toggleEnableTimer() {
    this.gameService.timerEnabled$.next(!this.timerEnabled);
    if(this.timerEnabled) {
      document.getElementById("sliderTime")!.removeAttribute("disabled");
    }
    else {
      document.getElementById("sliderTime")!.setAttribute("disabled", "true");
    }
  }

  retour(): void {
    this.router.navigateByUrl("profil-patient");
  }
}
