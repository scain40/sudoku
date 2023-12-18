import { Injectable } from '@angular/core';

@Injectable( {
    providedIn: 'root'
} )
export class TimerService {

    /** Public variabled */
    public timeElapsed: number = 0;

    /** Private Variables */
    private startTime: number = 0;
    private timerInterval: any;

    constructor() {}

    /**
     * Starts the timer
     */
    start_timer(): void {
        this.startTime = Date.now();
        this.timeElapsed = 0;
        this.end_timer();
        this.timerInterval = setInterval( () => {
            this.timeElapsed = Date.now() - this.startTime;
        }, 1000 );
    }

    /**
     * Ends the timer
     */
    end_timer(): void {
        clearInterval( this.timerInterval );
    }
}
