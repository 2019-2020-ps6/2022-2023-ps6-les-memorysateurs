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
    return {'flipped': this.isFlipped, 'disabled': this.isDisabled, 'checked': this.isMatched && this.isChecked, 'not-checked': !this.isMatched && this.isChecked
    }
  }

  constructor() {
  }
  @Input() public picture: string = "";
  @Input() public numCard: number = 0;
  @Input() public numGrid: number = -1;
  @Input() public isFlipped: boolean = false;
  @Input() public isDisabled: boolean = false;
  @Input() public isClickable: boolean = true;
  public isMatched: boolean = false;
  public isChecked: boolean = false;

  @Output() onClickToParent = new EventEmitter<Card>();

  public getNumGrid(): number {
    return this.numGrid;
  }

  public flip() : void {
    this.isFlipped = !this.isFlipped;
  }

  public setUnflip() : void {
    this.isFlipped = false;
  }

  public match() : void {
    this.isMatched = true;
    this.isChecked = true;
  }

  public clickable() : void {
    this.isClickable = true;
  }

  public unclickable() : void {
    this.isClickable = false;
  }

  public nomatch() : void {
    this.isMatched = false;
    this.isChecked = true;
  }

  public reset() : void {
    this.isDisabled = false;
    this.isChecked = false;
    this.isMatched = false;
    this.isClickable = true;
    this.isFlipped = false;
  }

  public disappear() : void {
    this.isDisabled = true;
    this.isChecked = false;
    this.isMatched = false;
    this.isClickable = false;
    this.isFlipped = false;
  }

  public reveal() : void {
    this.isFlipped = true;
    this.isClickable = false;
  }

  @HostListener("click") onClick(){
      if(this.isClickable && !this.isDisabled) {
        this.onClickToParent.emit(this);
      }
  }
}
