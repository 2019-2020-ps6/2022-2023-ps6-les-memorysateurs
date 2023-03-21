import { Card } from './card.component';
import { Component, OnInit, OnChanges, ViewChildren, QueryList, AfterViewInit, Input, SimpleChanges, Output } from '@angular/core';

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

export class CardsContainer implements OnInit, OnChanges {
  @Output() cards = [
    {picture: '../../assets/images/1.png', numCard: 1, name: "0", isFlipped: false, isDisabled: false},
    {picture: '../../assets/images/1.png', numCard: 2, name: "1", isFlipped: false, isDisabled: false},
    {picture: '../../assets/images/1.png', numCard: 1, name: "2", isFlipped: false, isDisabled: false},
    {picture: '../../assets/images/1.png', numCard: 3, name: "3", isFlipped: false, isDisabled: false},
    {picture: '../../assets/images/1.png', numCard: 2, name: "4", isFlipped: false, isDisabled: false},
    {picture: '../../assets/images/1.png', numCard: 4, name: "5", isFlipped: false, isDisabled: false},
    {picture: '../../assets/images/1.png', numCard: 4, name: "6", isFlipped: false, isDisabled: false},
    {picture: '../../assets/images/1.png', numCard: 3, name: "7", isFlipped: false, isDisabled: false},
  ]

  @ViewChildren(Card) children: QueryList<Card> = new QueryList<Card>();

  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes");
    console.log(changes);
  }
  ngOnInit(): void {
  }

  public delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  

  public getColumns(): string {
    return 'repeat(' + this.cards.length/2 + ', 1fr)';
  }

  public flipCardEnabled() {
    var needflip = document.getElementsByClassName("card");
    Array.prototype.forEach.call(needflip, element => {
      if(!element.classList.contains('disabled')) {
        element.classList.add('display-flip');
      }
    });
  }
  
  public onClickEvent(event: any) {
    console.log(event);
    console.log(this.cards);
    console.log(this.cards.filter(x => x.isFlipped==true).length);
    if(this.cards.filter(x => x.isFlipped).length >= 2) {
      return;
    }
    console.log(event.isFlipped);
    event.isFlipped = !event.isFlipped;
    console.log(event.isFlipped);
    var flipped = this.cards.filter(x => x.isFlipped);
    if(flipped.length == 2) {
      if(flipped[1].numCard == flipped[0].numCard) {
        flipped.forEach(element => {
          element.isDisabled = true;
          element.isFlipped = false;
        });
      }
      else {
        flipped.forEach(element => {
          element.isFlipped = false;
        });
      }
    }
    else {
      flipped.forEach(element => {
        element.isFlipped = false;
      });
    }
    event.ngOnChanges(event);
  }

  // public async OnClick(event: any) {
  //   event.stopPropagation();
  //   if(!event?.target.classList.contains('disabled')) {
  //     event?.target.classList.toggle('flipped');
  //     var flipped = document.getElementsByClassName("flipped");
  //     if(flipped.length == 2) {
  //       console.log(flipped.length);
  //         //TODO : check if the cards are the same
  //         if(flipped[1].getAttribute("ng-reflect-name") == flipped[0].getAttribute("ng-reflect-name")) {
  //           console.log(flipped[1].getAttribute("ng-reflect-name") + " " + flipped[0].getAttribute("ng-reflect-name"));
  //           await this.delay(1000);
  //           Array.prototype.forEach.call(flipped, function(card) {
  //             card.classList.add('checked');
  //           });
  //           await this.delay(2000);
  //           flipped[0].classList.add('disabled');
  //           flipped[1].classList.add('disabled');
  //           flipped[0].classList.remove('flipped');
  //           event?.target.classList.remove('flipped');
            
  //         }
  //         else {
  //           //TODO: sleep 1 second before removing the flipped class
  //           await this.delay(1000);
  //           //TODO
  //           flipped[0].classList.add('not-checked');
  //           flipped[1].classList.add('not-checked');
  //           await this.delay(2000);
  //           flipped[0].classList.remove('not-checked');
  //           flipped[1].classList.remove('not-checked');
  //           event?.target.classList.remove('flipped');
  //       }
  //     }
  //     else if(flipped.length > 2) {
  //       Array.prototype.forEach.call(flipped, function(card) {
  //         card.classList.remove('flipped');
  //       });
  //     }
  //     var cardsFind = document.getElementsByClassName("card");
  
  //   }
  // }
}
