import { Component, OnInit, Input, Inject } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'
]
})

export class Card implements OnInit {
  ngOnInit(): void {}
  constructor() {
  }

  @Input() public picture: string = "../../assets/images/1.png";
  @Input() public numCard: number = 0;
  @Input() public name: string = "test";
  @Input() public isFlipped: boolean = false;
}
