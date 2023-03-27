import { Component, ViewChild, Query, OnInit } from '@angular/core';
import {Theme} from "../../models/theme.models";
import {ThemeService} from "../services/theme.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-creer-memory',
  templateUrl: './creer-memory.component.html',
  styleUrls: ['./creer-memory.component.scss']
})
export class CreerMemoryComponent implements OnInit {
  themeChoisis = this.themeService.themeSelectionne$.getValue();
  //temps
  min = 5;
  max = 60;
  value = this.min;
  

  //nb de carte
  minNbCardTips = 2;
  maxNbCardTips = 4;
  valueNbCardTips = 3;


  
  constructor(public router: Router, public themeService: ThemeService) {

  }
  ngOnInit(): void {
  }

  valueTimeChange(value : any) {
    this.value = parseInt(value);
    var output = (document.getElementById("sliderTimeOut") as HTMLFormElement);
    var container = (document.getElementById("divSliderTimeOut") as HTMLFormElement);
    var calcc = ((this.value - this.min) / (this.max - this.min));
    var size = (output.offsetWidth)/container.offsetWidth;
    console.log((calcc*(1-size))*100);
    output.style.left = (calcc*(1-size))*100 + "%";
  }

  valueNbCardTipsChange(value : any) {
  }

  lancerPartie(){
    console.log("test");
  }

  onChangerTheme() {
    this.router.navigateByUrl("liste-theme");
  }
}
