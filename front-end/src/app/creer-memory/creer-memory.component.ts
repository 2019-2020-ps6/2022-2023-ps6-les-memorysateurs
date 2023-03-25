import { Component } from '@angular/core';
import {Theme} from "../../models/theme.models";
import {ThemeService} from "../services/theme.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-creer-memory',
  templateUrl: './creer-memory.component.html',
  styleUrls: ['./creer-memory.component.scss']
})
export class CreerMemoryComponent {
  themeChoisis = this.themeService.themeSelectionne$.getValue();
  constructor(public router: Router, public themeService: ThemeService) {

  }

  lancerPartie(){
    console.log("test");
  }

  onChangerTheme() {
    this.router.navigateByUrl("liste-theme");
  }
}
