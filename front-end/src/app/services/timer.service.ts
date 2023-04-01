import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimerService {
    isRunning : boolean = false;
    startTime : number = 600;
    progress : number = 0;
    step : number = 10;
    private subject = new Subject<number>();

    sendTimer(time: number) {
        this.subject.next(time);
    }

    startTimer() {
        this.isRunning = true;
        this.funcTimer();
    }

    async funcTimer() {
        while(this.progress>0 && this.isRunning) {
            await new Promise( resolve => setTimeout(resolve, this.step));
            this.progress--;
            this.subject.next(this.progress);
        }
        this.isRunning = false;
    }

    setTimer(time: number) {
        this.progress = time;
    }

    resetTimer() {
        this.progress = this.startTime.valueOf();
    }

    pauseTimer() {
        this.isRunning = false;
    }

    stopTimer() {
        this.isRunning = false;
        this.clearTimer();
    }

    clearTimer() {
        this.progress = 0;
        this.isRunning = false;
        this.subject.next(this.progress);
    }

    setDuration(duration: number) {
        this.startTime = duration;
    }

    getTimer(): Observable<any> {
        return this.subject.asObservable();
    }

    isInRun() : boolean {
        return this.isRunning;
    }
}