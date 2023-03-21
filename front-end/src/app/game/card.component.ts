import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { elementAt } from 'rxjs';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'
]
})

export class Card implements OnInit, OnChanges {
  ngOnInit(): void {}
  ngDoCheck(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
      // if(this.isFlipped) {
      // }
      // else {
      //   .classList.remove('flipped');
      // }
      // if(this.isDisabled) {
      //   .classList.add('disabled');
      // }
      // else {
      //   .classList.remove('disabled');
      // }
      // if(!this.isClickable) {
      //   .classList.add('unclickable');
      // }
      // else {
      //   .classList.remove('unclickable');
      // }

  }

  changeClass() {
    return {'flipped': this.isFlipped, 'disabled': this.isDisabled
    }
  }

  constructor() {
  }
  @Input() public picture: string = "";
  @Input() public numCard: number = 0;
  @Input() public name: string = "test";
  @Input() public isFlipped: boolean = false;
  @Input() public isDisabled: boolean = false;
  @Input() public isClickable: boolean = true;

  @Output() onClickToParent = new EventEmitter<Card>();


  @HostListener("click") onClick(){
      console.log("click");
      console.log(this);
      if(this.isClickable && !this.isDisabled) {
        this.onClickToParent.emit(this);
      }
  }
}
