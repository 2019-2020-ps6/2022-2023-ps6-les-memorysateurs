import { Card } from './card.component';
import { Component, OnInit, Directive, HostListener, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

// @Directive({selector: 'button[counting]'})

// class CountClicks {
//   numberOfClicks = 0;

//   @HostListener('click', ['$event.target'])
//   onClick(btn) {
//     console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
//   }
// }

@Component({
  selector: 'app-cardcontainer',
  templateUrl: './cardcontainer.component.html',
  styleUrls: ['./cardcontainer.component.scss']
})

export class CardsContainer implements OnInit, AfterViewInit {
  cards = [
    {picture: "../../assets/images/1.png", numCard: 1, name: "1", isFlipped: false},
    {picture: "../../assets/images/1.png", numCard: 2, name: "2", isFlipped: false},
    {picture: "../../assets/images/1.png", numCard: 1, name: "1", isFlipped: false},
    {picture: "../../assets/images/1.png", numCard: 3, name: "3", isFlipped: false},
    {picture: "../../assets/images/1.png", numCard: 2, name: "2", isFlipped: false},
    {picture: "../../assets/images/1.png", numCard: 4, name: "4", isFlipped: false},
    {picture: "../../assets/images/1.png", numCard: 4, name: "4", isFlipped: false},
    {picture: "../../assets/images/1.png", numCard: 3, name: "3", isFlipped: false},
  ]

  @ViewChildren(Card) children: QueryList<Card> = new QueryList<Card>();

  constructor() {
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // this.children.forEach((child) => {
    //   child.OnClick = this.OnClick;
    // });
  }

  public delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  

  public getColumns(): string {
    return 'repeat(' + this.cards.length/2 + ', 1fr)';
  }
  
  public async OnClick(event: any) {
    event.stopPropagation();
    if(!event?.target.classList.contains('disabled')) {
      event?.target.classList.toggle('flipped');
      var flipped = document.getElementsByClassName("flipped");
      if(flipped.length == 2) {
        console.log(flipped.length);
          //TODO : check if the cards are the same
          if(flipped[1].getAttribute("ng-reflect-name") == flipped[0].getAttribute("ng-reflect-name")) {
            console.log(flipped[1].getAttribute("ng-reflect-name") + " " + flipped[0].getAttribute("ng-reflect-name"));
            await this.delay(1000);
            Array.prototype.forEach.call(flipped, function(card) {
              card.classList.add('checked');
            });
            await this.delay(2000);
            flipped[0].classList.add('disabled');
            flipped[1].classList.add('disabled');
            flipped[0].classList.remove('flipped');
            event?.target.classList.remove('flipped');
            
          }
          else {
            //TODO: sleep 1 second before removing the flipped class
            await this.delay(1000);
            //TODO
            flipped[0].classList.add('not-checked');
            flipped[1].classList.add('not-checked');
            await this.delay(2000);
            flipped[0].classList.remove('not-checked');
            flipped[1].classList.remove('not-checked');
            event?.target.classList.remove('flipped');
        }
      }
      else if(flipped.length > 2) {
        Array.prototype.forEach.call(flipped, function(card) {
          card.classList.remove('flipped');
        });
      }
      var cardsFind = document.getElementsByClassName("card");
  
    }
  }
}
