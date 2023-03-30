import { Component, ViewChild, Query, OnInit } from '@angular/core';
import {Theme} from "../../models/theme.models";
import {ThemeService} from "../services/theme.service";
import {Router} from "@angular/router";
import {GameService} from "../services/game.service";
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

  //paramètres
  nombreCarte!: number;
  nombreCartesIndice!: number;
  dureeIndice!: number;


  constructor(public router: Router, public themeService: ThemeService, public gameService: GameService) {
    gameService.nombreCartes$.subscribe((nombreCarte: number) => {
      this.nombreCarte = nombreCarte;
      let nbCardsForTips = nombreCarte/2;
      this.numberOfCardsTips = [2];
      for (let i = 1; i < nbCardsForTips; i++) {
        this.numberOfCardsTips.push((i+1)*2);
      }
      if(this.nombreCartesIndice >= nbCardsForTips*2) {
        gameService.nombreCartesIndice$.next(this.numberOfCardsTips[this.numberOfCardsTips.length-1]);
      }
    })

    gameService.nombreCartesIndice$.subscribe((nombreCartesIndice: number) => {
      this.nombreCartesIndice = nombreCartesIndice;
    })

    gameService.dureeIndice$.subscribe((dureeIndice: number) => {
      this.dureeIndice = dureeIndice;
    })

    themeService.themeSelectionne$.subscribe((theme: Theme) => {
      this.themeSelectionne = theme;
    })

  }
  ngOnInit(): void {
  }

  onValueTimeChange(newDuration : number) {
    this.gameService.dureeIndice$.next(newDuration);

    //modification style pour que l'affichage de l'input reste cohérent
    var output = (document.getElementById("sliderTimeOut") as HTMLFormElement);
    var container = (document.getElementById("divSliderTimeOut") as HTMLFormElement);
    var calcc = ((newDuration - this.min) / (this.max - this.min));
    var size = (output.offsetWidth)/container.offsetWidth;
    console.log((calcc*(1-size))*100);
    output.style.left = (calcc*(1-size))*100 + "%";

  }

  onNbCarteChange(value: number){
    this.gameService.nombreCartes$.next(value);
  }

  onNbCardTipsChange(value : number) {
  }

  lancerPartie(){
    console.log("test");
  }

  onChangerTheme() {
    this.router.navigateByUrl("liste-theme");
  }
}
