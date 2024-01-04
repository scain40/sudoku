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
        this.controlService.difficultyName = difficulty;
        switch( difficulty ) {
            case 'EASY':
                this.controlService.reset_board( Difficulty.EASY );
                break;
            case 'MEDIUM':
                this.controlService.reset_board( Difficulty.MEDIUM );
                break;
            case 'HARD':
                this.controlService.reset_board( Difficulty.HARD );
                break;
            case 'EXPERT':
                this.controlService.reset_board( Difficulty.EXPERT );
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
