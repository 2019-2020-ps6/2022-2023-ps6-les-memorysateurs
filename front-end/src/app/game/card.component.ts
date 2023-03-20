import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'
]
})

export class Card implements OnInit {
onImageClick(event: Event) {
  event.stopPropagation();
  this.parentClick.emit(event);
}
  ngOnInit(): void {}
  constructor() {
  }

  OnClick(event: any) : void {};
  @Input() public picture: string = "../../assets/images/1.png";
  @Input() public numCard: number = 0;
  @Input() public name: string = "test";
  @Input() public isFlipped: boolean = false;

  @Output() parentClick : EventEmitter<Event> = new EventEmitter();


}
