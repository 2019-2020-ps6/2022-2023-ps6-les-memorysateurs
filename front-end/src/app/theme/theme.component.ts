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


  onSelectionner(){
    this.themeService.themeSelectionne$.next(this.theme);
    this.router.navigateByUrl('creer-memory')
  }

  onEditer(){
    this.themeService.themeSelectionne$.next(this.theme);
    this.router.navigateByUrl('creer-theme')
  }

}
