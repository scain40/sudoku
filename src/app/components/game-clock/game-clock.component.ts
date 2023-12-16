import { Component } from '@angular/core';
import { TimerService } from 'src/app/services/timer-service/timer.service';

@Component( {
  selector: 'game-clock',
  templateUrl: './game-clock.component.html',
  styleUrls: [ './game-clock.component.scss' ]
} )
export class GameClockComponent {

    constructor( protected timerService: TimerService ) {}

    /**
     * Formats the time elapsed into a string for display
    */
    format_time(): string {
        let time = new Date( this.timerService.timeElapsed );
        let minutes = time.getMinutes().toString();
        let seconds = time.getSeconds().toString();
        return `${ minutes.padStart( 2, '0' ) }:${ seconds.padStart( 2, '0' ) }`;
    }

}
