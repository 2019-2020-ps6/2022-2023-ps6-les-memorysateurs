import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss']
})

export class Button implements OnInit {
  ngOnInit(): void {}

  constructor() {
  }

  @Input() public title : string = 'Button';
  public action : any;

}