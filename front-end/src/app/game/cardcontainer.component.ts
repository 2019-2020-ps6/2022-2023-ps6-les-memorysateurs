import { Card } from './card.component';
import { Component, OnInit, OnChanges, OnDestroy, ViewChildren, QueryList, Input, SimpleChanges, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { HintContainer } from './game.component';
import { TimerService } from '../services/timer.service';

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

export class CardsContainer implements OnInit, OnChanges, OnDestroy {

  @Input() public transitionTime : number = 2000;
  @Input() public Timer : number = 5000;
  public isHinted: boolean = false;
  @ViewChildren(Card) children: QueryList<Card> = new QueryList<Card>();
  
  hinted = this.children.filter(x => !x.isFlipped && !x.isDisabled);

  subscription: Subscription;

  @Output() initCards = [
    {picture: '../../assets/images/1.png', numCard: 1, numGrid: 0, isFlipped: false, isDisabled: false},
    {picture: '../../assets/images/1.png', numCard: 2, numGrid: 1, isFlipped: false, isDisabled: false},
    {picture: '../../assets/images/1.png', numCard: 1, numGrid: 2, isFlipped: false, isDisabled: false},
    {picture: '../../assets/images/1.png', numCard: 3, numGrid: 3, isFlipped: false, isDisabled: false},
    {picture: '../../assets/images/1.png', numCard: 2, numGrid: 4, isFlipped: false, isDisabled: false},
    {picture: '../../assets/images/1.png', numCard: 4, numGrid: 5, isFlipped: false, isDisabled: false},
    {picture: '../../assets/images/1.png', numCard: 4, numGrid: 6, isFlipped: false, isDisabled: false},
    {picture: '../../assets/images/1.png', numCard: 3, numGrid: 7, isFlipped: false, isDisabled: false},
  ]


  constructor(private sender : TimerService, private timerService: TimerService) {
    this.subscription = this.sender.getTimer().subscribe( num => {
      if(!this.isHinted && num > 0) {
        console.log(sender);
        this.hinted = this.children.filter(x => !x.isFlipped && !x.isDisabled);
        this.isHinted = true;
        this.reveal(this.hinted);
      }
      if(num == 0) {
        this.isHinted = false;
        this.reset(this.hinted);
      }
    });
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  // DELAY
  public delayTransition() {
    return this.delay(this.transitionTime);
  }

  public delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  // SETUP GRID
  public getColumns(): string {
    return 'repeat(' + this.initCards.length/2 + ', 1fr)';
  }
  
  // ON CLICK EVENT VERIFY SEQUENCES
  public async onClickEvent(event : any) {

    if(this.getAllFlipped().length >= 2 && event.isFlipped == false) {
      return;
    }
    else {
      event.flip();
      this.flipCheck(event);
    }

    // get all cards flipped
    var flipped = this.children.filter(x => x.isFlipped);
    
    // setup unclickable cards
    var clickable = this.children.filter(x => x.isClickable && !x.isDisabled);
    clickable.forEach(element => {
      element.unclickable();
    });

    if(flipped.length == 2) {
      await this.delayTransition();
      // cards are the same
      if(flipped[1].numCard == flipped[0].numCard) {
        //set status matching
        flipped.forEach(element => {
          element.match();
        });
        await this.delayTransition();
        //disable & delete cards
        flipped.forEach(element => {
          element.disappear();
        });
      }
      // cards are not the same
      else {
        //set status not matching
        flipped.forEach(element => {
          element.nomatch();
        });
        await this.delayTransition();
        flipped.forEach(element => {
          element.reset();
        });
        //display tips
        this.sender.resetTimer();
        this.sender.startTimer();
        //flip cards back
        this.reset(clickable);

      }
      
    }
    
    // setup clickable cards
    clickable.forEach(element => {
      element.clickable();
    });
    event.ngOnChanges(event);
  }

  public getAllFlipped() {
    return this.children.filter(x => x.isFlipped);
  }

  public flipCheck(event: any) {
    if(this.getAllFlipped().length==2) {
        //TODO: check if the cards are the same and disable them if they are or flip event back if they are not
    }
    else if(this.getAllFlipped().length>2) {
      this.getAllFlipped().forEach(element => {
        element.isFlipped = false;
      });
    }
    
  }

  public async reveal(cards : Card[]) {
    cards.forEach(element => {
      element.reveal();
    });
  }
  public async reset(cards : Card[]) {
    cards.forEach(element => {
      element.reset();
    });
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
