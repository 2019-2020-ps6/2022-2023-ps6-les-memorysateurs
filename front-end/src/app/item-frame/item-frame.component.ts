import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Theme} from "../../models/theme.models";
import {ThemeService} from "../services/theme.service";
import {Router} from "@angular/router";
import {Cardable} from "../../models/cardable.models";

@Component({
  selector: 'app-theme',
  templateUrl: './item-frame.component.html',
  styleUrls: ['./item-frame.component.scss']
})
export class ItemFrameComponent {
  @Input() item!: Cardable;


  constructor(public router: Router, public themeService: ThemeService) {
  }


  onSelectionner(){
    let themeSelectionne: Theme = this.themeService.getThemeById(this.item.getID());
    this.themeService.themeSelectionne$.next(themeSelectionne);
    this.router.navigateByUrl('creer-memory');
  }

  onEditer(){
    let themeEdite: Theme = this.themeService.getThemeById(this.item.getID());
    this.themeService.themeEdite$.next(themeEdite);
    this.router.navigateByUrl('creer-theme');
  }

}
