import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-meter',
  templateUrl: './meter.component.html',
  styleUrls: ['./game.component.scss']
})

export class Timer implements OnInit {
    @Input() durationInSeconds: number = 60;
    interval: any;
    remainingTime: number = 0;
  
    ngOnInit() {
      this.startTimer();
    }
  
    public startTimer(): void {
        if (this.interval) { // Vérifie si le timer est déjà en cours d'exécution
          return;
        }
        this.interval = setInterval(() => {
          if (this.remainingTime > 0) {
            this.remainingTime--;
          } else {
            this.stopTimer();
          }
        }, 1);
      }
  
    stopTimer() {
      clearInterval(this.interval);
    }
  }