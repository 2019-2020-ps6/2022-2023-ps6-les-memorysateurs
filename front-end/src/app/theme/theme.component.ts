import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Theme} from "../../models/theme.models";

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent {
  @Input() theme!: Theme;
  @Output() themeSelectionne: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() editerTheme: EventEmitter<boolean> = new EventEmitter<boolean>();

  afficherImages: boolean = false;
  textAfficherImages: string = 'Afficher Images';

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
    this.themeSelectionne.emit();
  }

  onEditer(){
    this.editerTheme.emit();

  }

}
