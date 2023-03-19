import { Component, OnInit, Input } from '@angular/core';

import { Menu } from '../menu/menu.component';
import { Button } from '../utilities/button/btn.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class Game implements OnInit {
  ngOnInit():void {}
  constructor() {}
  public menu : Menu = new Menu();
}



@Component({
  selector: 'app-hintcontainer',
  template: `
    <button (click)="toggleTimer()">
       Indice
    </button>
    <div class="meter">
      <div class="meter-bar">{{isRunning ? (((progress/60) | number:'2.0-0') + ":" + (progress%60 | number:'2.0-0')):''}}</div>
    </div>
  `,
  styleUrls: ['./game.component.scss', '../utilities/button/btn.component.scss']
})
export class HintContainer implements OnInit {
  @Input() duration: number = 600;
  progress: number = 0;
  interval: any;
  isRunning: boolean = false;

  ngOnInit() {
    this.progress = 0;
  }

  startTimer() {
    this.isRunning = true;
    this.interval = setInterval(() => {
      this.progress--;
      if (this.progress <= 0) {
        clearInterval(this.interval);
        this.isRunning = false;
      }
    }, 17
    );
  }

  stopTimer() {
    clearInterval(this.interval);
    this.progress = 0;
    this.isRunning = false;
  }

  toggleTimer() {
    if (this.isRunning) {
      this.stopTimer();
    } else {
      this.progress = this.duration.valueOf();
      this.startTimer();
    }
  }
}
