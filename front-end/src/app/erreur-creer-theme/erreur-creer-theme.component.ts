import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-erreur-creer-theme',
  templateUrl: './erreur-creer-theme.component.html',
  styleUrls: ['./erreur-creer-theme.component.scss']
})
export class ErreurCreerThemeComponent {

@Input()
  erreurImage = false;
@Input()
  erreurTitre = false;

@Output()
  popup : EventEmitter<boolean> = new EventEmitter<boolean>();


  fermerPopup(){
    this.popup.emit(false);
  }
}
