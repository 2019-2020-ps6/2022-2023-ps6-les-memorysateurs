import { Card } from './card.component';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-cardcontainer',
  templateUrl: './cardcontainer.component.html',
  styleUrls: ['./cardcontainer.component.scss']
})

export class CardsContainer implements OnInit {
  ngOnInit(): void {}
  constructor() {}
  cards = [
    {picture: "../../assets/images/1.png", numCard: 1, name: "1", isFlipped: false},
    {picture: "../../assets/images/1.png", numCard: 2, name: "2", isFlipped: false},
    {picture: "../../assets/images/1.png", numCard: 3, name: "3", isFlipped: false},
    {picture: "../../assets/images/1.png", numCard: 4, name: "4", isFlipped: false},
    {picture: "../../assets/images/1.png", numCard: 5, name: "5", isFlipped: false},
    {picture: "../../assets/images/1.png", numCard: 6, name: "6", isFlipped: false},
    {picture: "../../assets/images/1.png", numCard: 7, name: "7", isFlipped: false},
    {picture: "../../assets/images/1.png", numCard: 8, name: "8", isFlipped: false},
  ]

  public getColumns(): string {
    return 'repeat(' + this.cards.length/2 + ', 1fr)';
  }
}
