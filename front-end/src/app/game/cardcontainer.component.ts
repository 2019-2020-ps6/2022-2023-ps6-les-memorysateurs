import { Card } from './card.component';
import { Component, OnInit, OnChanges, OnDestroy, ViewChildren, QueryList, Input, SimpleChanges, Output, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HintContainer } from './game.component';
import { TimerService } from '../services/timer.service';
import { Theme } from 'src/models/theme.models';
import {Router} from "@angular/router";
import {GameService} from "../services/game.service";

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

export class CardsContainer implements OnInit, OnChanges, AfterViewInit {

  @Input() public transitionTime : number = 2000;
  @Input() public Timer : number = 5000;
  public isHinted: boolean = false;
  @ViewChildren(Card) children: QueryList<Card> = new QueryList<Card>();

  hinted : Card[] = this.children.filter(x => !x.isFlipped && !x.isDisabled);

  subscription: Subscription;
  @Input() public theme: Theme = new Theme('Default', ['assets/images/default/clock.png','assets/images/default/spacejet.png', 'assets/images/default/ring.png', 'assets/images/default/hamster.png']);

  initCards: any[] = [];


  constructor(private sender : TimerService, public gameService: GameService, public router : Router) {
    this.subscription = this.sender.getTimer().subscribe( num => {
      if(!this.isHinted && num > 0) {
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
  ngAfterViewInit(): void {
    this.reveal(this.children.toArray());
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.initCards = this.theme.images.map((x, i) => {
      return {picture: x, numCard: i+1, numGrid: i};
    });
    this.initCards = this.initCards.concat(this.initCards);
    this.initCards.sort(() => Math.random() - 0.5);
    this.children.forEach((x, i) => {
      x.numCard = this.initCards[i].numCard;
      x.numGrid = this.initCards[i].numGrid;
      x.picture = this.initCards[i].picture;
    });
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
    return 'repeat(' + this.theme.images.length + ', 1fr)';
  }

  // ON CLICK EVENT VERIFY SEQUENCES
  public async onClickEvent(event : any) {

    if(this.getAllFlipped().length >= 2 && event.isFlipped == false) {
      return;
    }
    else {
      event.flip();
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

        this.gameService.addCarteTrouvee(flipped[0].picture)
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

    //check if the game is over
    // TODO: move to next page
    this.children.filter(x => !x.isDisabled).length == 0 ? console.log("Game Over") : {};
  }

  public getAllFlipped() {
    return this.children.filter(x => x.isFlipped);
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
}
