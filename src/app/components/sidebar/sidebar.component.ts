import { Component, Input } from '@angular/core';
import { Difficulty } from 'src/app/enums/difficulty';
import { ControlService } from 'src/app/services/control/control.service';
import { StatsService } from 'src/app/services/stats/stats.service';

@Component( {
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
} )
export class SidebarComponent {

    difficulties = Object.entries( Difficulty );

    @Input() open: boolean = false;

    constructor( protected controlService: ControlService, private statsService: StatsService ) {}

    /**
     * Calls to switch difficulty and reset the game
     * @param difficulty Difficulty value being set
     */
    set_difficulty( difficulty: string ): void {
        console.log('Setting difficulty to ' + difficulty);
        this.controlService.difficultyName = difficulty;
        switch( difficulty ) {
            case 'EASY':
                this.controlService.change_difficulty( Difficulty.EASY );
                break;
            case 'MEDIUM':
                this.controlService.change_difficulty( Difficulty.MEDIUM );
                break;
            case 'HARD':
                this.controlService.change_difficulty( Difficulty.HARD );
                break;
            case 'EXPERT':
                this.controlService.change_difficulty( Difficulty.EXPERT );
                break;
        }
    }

    /**
     * Opens the statistics modal
     */
    open_stats(): void {
        this.statsService.open_modal();
    }

}
