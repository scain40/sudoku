import { Injectable } from '@angular/core';

@Injectable( {
    providedIn: 'root'
} )
export class TimerService {
    
    public timeElapsed: number = 0;

    private startTime: number = 0;
    private timerInterval: any;

    constructor() {
        this.start_timer();
    }
    
    /**
     * Starts the timer
     */
    start_timer(): void {
        this.startTime = Date.now();
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
