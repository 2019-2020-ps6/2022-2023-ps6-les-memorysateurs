import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-info-stade',
  templateUrl: './info-stade.component.html',
  styleUrls: ['./info-stade.component.scss']
})
export class InfoStadeComponent {

  @Output()
  close : EventEmitter<boolean> = new EventEmitter<boolean>();


  closeFNC(){
    this.close.emit(true);
  }
}
