import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-erreur-partager-theme',
  templateUrl: './erreur-partager-theme.component.html',
  styleUrls: ['./erreur-partager-theme.component.scss']
})
export class ErreurPartagerThemeComponent {
  @Input()
  erreurTelephone = false;
  @Input()
  erreurMessage = false;

  @Output()
  popup : EventEmitter<boolean> = new EventEmitter<boolean>();


  fermerPopup(){
    this.popup.emit(false);
  }
}
