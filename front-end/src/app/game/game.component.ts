import {Component, OnInit, AfterViewInit, OnDestroy, Input, Output} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { MenuComponent } from '../menu/menu.component';

import { TimerService } from '../services/timer.service';
import { GameService } from '../services/game.service';
import { ThemeService } from '../services/theme.service';
import {Theme} from "../../models/theme.models";
import { Combinaison } from 'src/models/combinaison.models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class Game implements OnInit {
  ngOnInit():void {
  }

  public nbCards : number = 0;
  public nbCardsTips : number = 0;
  public timer : number = 0;
  public enableTimer : boolean = false;
  public theme: Theme = new Theme('Default', ['assets/images/default/clock.png','assets/images/default/spacejet.png', 'assets/images/default/ring.png', 'assets/images/default/hamster.png']);
  public lastCombinaison? : Combinaison;


  constructor(private gameService : GameService, private themeService : ThemeService) {
    this.gameService.nombreCartes$.subscribe( num => {
      this.nbCards = num;
    });
    this.gameService.nombreCartesIndice$.subscribe( num => {
      this.nbCardsTips = num;
    });
    this.gameService.timerEnabled$.subscribe( bool => {
      this.enableTimer = bool;
    });
    this.gameService.dureeIndice$.subscribe( num => {
      this.timer = num;
    });
    this.themeService.themeSelectionne$.subscribe( theme => {
      this.theme = theme;
    });
    this.gameService.combinations$.subscribe( combinaison => {
      this.lastCombinaison = combinaison.lastCombinaison;
    });
  };
}


@Component({
  selector: 'app-hintcontainer',
  template: `
    <section id="hintcontainer">
      <div id="meter">
        <div id="meter-bar"><!--{{(sender.isInRun() && sender.isEnableTimer()) ? (((progress/60) | number:'2.0-0') + ":" + (progress%60 | number:'2.0-0')):''}}--></div>
      </div>
      <button (click)="toggleTimer()">
        Indice
      </button>
</section>
  `,
  styleUrls: ['./game.component.scss', '../utilities/button/btn.component.scss']
})


export class HintContainer implements OnInit, AfterViewInit {
  isRunning : boolean = false;
  progress : number = 0;
  subscription: Subscription;
  @Input() public enableTimer : boolean = true;
  //stats

  constructor(public sender: TimerService, public gameService : GameService) {
    this.sender.setDuration(this.gameService.dureeIndice$.value*60);
    this.sender.resetTimer();
    
    this.subscription = this.sender.getTimer().subscribe( num => {
      this.progress = num;
      let bar = document.getElementById("meter-bar");
      if(bar != null) {
        bar.style.width = (num/this.sender.getDuration()*100) + "%";
      }
    });
    this.gameService.isRecurentCombinaison$.subscribe(isRecurrent => {
      let popup = document.getElementById("combSection");
       if(isRecurrent) {
          if(popup != null) {
            popup.style.animationName = "";
            void popup.offsetWidth;
            popup.style.animationName = "slide-up";
          }
          let popuptext = document.getElementById("numberRecurenceCombinaison");
          if(popuptext != null) {
            popuptext.innerHTML = "Cette combinaison est revenue " + this.gameService.combinations$.value.recurenceOfLastCombinaison().toString() + " fois";
          }
       }
    });
  }
  ngAfterViewInit(): void {
    this.sender.setEnableTimer(this.enableTimer);
    let popup = document.getElementById("combSection");

    if(popup != null) {
      //if the popup is clicked, the animation is reseted.
      popup.addEventListener("click", () => {
        let popup = document.getElementById("combSection");
        if(popup != null) {
          popup.style.animationName = "";
          void popup.offsetWidth;
        }
        let container = document.getElementById("cardCombContainer");
      });
    }
  }

  ngOnInit() {
    this.progress = 0;
  }

  toggleTimer() {
    
    if (this.sender.isInRun()) {
      this.sender.clearTimer();
    } else {
      this.gameService.incrementIndices();
      this.sender.resetTimer();
      this.sender.startTimer();
    }
  }
}
