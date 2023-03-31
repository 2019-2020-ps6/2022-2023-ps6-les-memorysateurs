import { Component, Input, Output, QueryList, ViewChildren, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-slider-number',
  templateUrl: './slider-number.component.html',
  styleUrls: ['./slider-number.component.scss']
})
export class SliderNumberComponent implements OnInit, AfterViewInit {
  @Input() title : string = "";
  @Input() numbers : number[] = [];

  radioButtons = document.getElementsByClassName("nbcards") as HTMLCollectionOf<HTMLInputElement>;

  constructor() {
  }
  ngAfterViewInit(): void {
    var firstele = this.radioButtons[0] as HTMLInputElement;
    console.log(firstele);
    if(firstele != undefined) {
      // add checked value to the first element
      firstele.checked = true;
    }
  }
  ngOnInit(): void {
  }

  public onClickMinus() {
    const current = Array.from(this.radioButtons).findIndex((radio) => radio.checked);
    const next = (current === 0) ? current : current - 1;
    
    this.radioButtons[next].checked = true;
  }

  public onClickPlus() {
    const current = Array.from(this.radioButtons).findIndex((radio) => radio.checked);
    const next = (current === this.radioButtons.length - 1) ? current : current + 1;

    this.radioButtons[next].checked = true;
  }

}
