import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Theme} from "../../models/theme.models";
import {ThemeService} from "../services/theme.service";
import {Router} from "@angular/router";
import {Cardable} from "../../models/cardable.models";

@Component({
  selector: 'app-item-frame',
  templateUrl: './item-frame.component.html',
  styleUrls: ['./item-frame.component.scss']
})
export class ItemFrameComponent {
  @Input() item!: Cardable;

  @Input() selectionnerText?: string = "SELECTIONNER";

  @Output()
  selectionneEvent: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  editerEvent: EventEmitter<number> = new EventEmitter<number>();


  onSelectionner(){
    this.selectionneEvent.emit(this.item.getID())
  }

  onEditer(){
    this.editerEvent.emit(this.item.getID())
  }

}
