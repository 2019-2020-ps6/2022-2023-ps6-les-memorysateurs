import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-erreur-creer-patient',
  templateUrl: './erreur-creer-patient.component.html',
  styleUrls: ['./erreur-creer-patient.component.scss']
})
export class ErreurCreerPatientComponent {

  @Input()
  erreurNom = false;
  @Input()
  erreurPrenom = false;
  @Input()
  erreurPhoto = false;
  @Output()
  popup : EventEmitter<boolean> = new EventEmitter<boolean>();

  fermerPopup(){
    this.popup.emit(false);
  }
}
