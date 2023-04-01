import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimerService {
    isRunning : boolean = false;
    startTime : number = 600;
    progress : number = this.startTime;
    step : number = 10;
    private subject = new Subject<number>();
    isEnable : boolean = true;

    sendTimer(time: number) {
        this.subject.next(time);
    }

    async startTimer() {
        this.isRunning = true;
        if(this.isEnable) {
            await this.funcTimer();
            this.progress = 0;
            this.subject.next(this.progress);
        }
        else {
            this.progress = -1;
            this.subject.next(this.progress);
        }
    }

    async funcTimer() {
        while(this.progress>0 && this.isRunning) {
            await new Promise( resolve => setTimeout(resolve, this.step));
            this.progress--;
            this.subject.next(this.progress);
        }
        this.progress = 0;
        this.isRunning = false;
    }

    setTimer(time: number) {
        this.progress = time;
    }

    resetTimer() {
        this.progress = this.startTime;
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

    enableTimer() {
        this.isEnable = true;
    }

    disableTimer() {
        this.isEnable = false;
    }

    setEnableTimer(bool: boolean) {
        this.isEnable = bool;
    }

    public isEnableTimer() : boolean {
        return this.isEnable;
    }
}