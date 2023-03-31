import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';


import { MenuComponent } from '../menu/menu.component';

import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class Game implements OnInit {
  ngOnInit():void {}

  constructor(private menu: MenuComponent) {};

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


export class HintContainer implements OnInit {
  isRunning : boolean = false;
  progress : number = 0;
  subscription: Subscription;

  constructor(public sender: TimerService) {
    this.subscription = this.sender.getTimer().subscribe( num => {
      this.progress = num;
    });
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
