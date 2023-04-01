import { Component, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { MenuComponent } from '../menu/menu.component';

import { TimerService } from '../services/timer.service';
import { GameService } from '../services/game.service';
import { ThemeService } from '../services/theme.service';
import {Theme} from "../../models/theme.models";

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
  public enableTimer : boolean = true;
  public theme: Theme = new Theme('Default', ['assets/images/default/clock.png','assets/images/default/spacejet.png', 'assets/images/default/ring.png', 'assets/images/default/hamster.png']);

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
  };

}


@Component({
  selector: 'app-hintcontainer',
  template: `
    <button (click)="toggleTimer()">
       Indice
    </button>
    <div class="meter">
      <div class="meter-bar">{{sender.isInRun() ? (((progress/60) | number:'2.0-0') + ":" + (progress%60 | number:'2.0-0')):''}}</div>
    </div>
  `,
  styleUrls: ['./game.component.scss', '../utilities/button/btn.component.scss']
})


export class HintContainer implements OnInit, AfterViewInit {
  isRunning : boolean = false;
  progress : number = 0;
  subscription: Subscription;
  @Input() public duration : number = 0;

  constructor(public sender: TimerService) {
    this.subscription = this.sender.getTimer().subscribe( num => {
      this.progress = num;
    });
  }
  ngAfterViewInit(): void {
    this.sender.setDuration(this.duration*60);
  }

  ngOnInit() {
    this.progress = 0;
  }

  toggleTimer() {
    if (this.sender.isInRun()) {
      this.sender.clearTimer();
    } else {
      this.sender.resetTimer();
      this.sender.startTimer();
    }
  }
}
