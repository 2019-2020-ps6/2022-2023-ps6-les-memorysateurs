
import { Component, Input, Output, QueryList, ViewChildren, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-slider-number',
  templateUrl: './slider-number.component.html',
  styleUrls: ['./slider-number.component.scss']
})
export class SliderNumberComponent implements OnInit, AfterViewInit {
  @Input() title : string = "";
  @Input() numbers : number[] = [];
  @Input() name = '';
  @Input() service : BehaviorSubject<any> = new BehaviorSubject<any>(0);

  constructor() {
  }
  ngAfterViewInit(): void {
    this.service.subscribe((value: number) => {
      // find the element with the value
      const ele = Array.from(document.getElementsByName(this.name)).find((radio) => (radio as HTMLInputElement).value === value.toString());
      if(ele != undefined) {
        (ele as HTMLInputElement).checked = true;
      }
    });
  }

  ngOnInit(): void {
  }

  public onClickMinus() {
    const current = Array.from(document.getElementsByName(this.name)).findIndex((radio) => (radio as HTMLInputElement).checked);
    const next = (current === 0) ? current : current - 1;


    (document.getElementsByName(this.name)[next] as HTMLInputElement).checked = true;

    this.service.next((document.getElementsByName(this.name)[next] as HTMLInputElement).value);
  }

  public onClickRadio(event: any) {
    this.service.next(event.target.value);
  }

  public onClickPlus() {
    const current = Array.from(document.getElementsByName(this.name)).findIndex((radio) => (radio as HTMLInputElement).checked);
    const next = (current === document.getElementsByName(this.name).length - 1) ? current : current + 1;

    (document.getElementsByName(this.name)[next] as HTMLInputElement).checked = true;

    this.service.next((document.getElementsByName(this.name)[next] as HTMLInputElement).value);
  }

}
