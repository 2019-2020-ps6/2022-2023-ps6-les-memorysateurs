import { Component } from '@angular/core';
import {Theme} from "../../models/theme.models";
import {ThemeService} from "../services/theme.service";

@Component({
  selector: 'app-liste-theme',
  templateUrl: './liste-theme.component.html',
  styleUrls: ['./liste-theme.component.scss']
})
export class ListeThemeComponent {
  private listeTheme: Theme[] = [];

  constructor(public themeService: ThemeService) {
    this.themeService.listeThemes$.subscribe((themes: Theme[]) => {
      this.listeTheme = themes;
    });
  }
}
