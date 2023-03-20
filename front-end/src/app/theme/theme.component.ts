import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Theme} from "../../models/theme.models";
import {ThemeService} from "../services/theme.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent {
  @Input() theme!: Theme;

  afficherImages: boolean = false;
  textAfficherImages: string = 'Afficher Images';

  constructor(public router: Router, public themeService: ThemeService) {
  }

  onAfficherImages(){
    if(this.afficherImages){
      this.afficherImages = false;
      this.textAfficherImages = 'Afficher Images';
    }
    else {
      this.afficherImages = true;
      this.textAfficherImages = 'Ne plus afficher';
    }

  }

  onSelectionner(){
    this.themeService.themeSelectionne$.next(this.theme);
    this.router.navigateByUrl('')
  }

  onEditer(){
  }

}
