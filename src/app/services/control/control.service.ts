import { Injectable } from '@angular/core';
import { Tile } from '../../interfaces/tile';
import { GenerationService } from '../generation/generation.service';
import { BoardChecksService } from '../board-checks/board-checks.service';
import { Difficulty } from 'src/app/enums/difficulty';
import { TimerService } from '../timer-service/timer.service';

@Injectable( {
    providedIn: 'root'
} )
export class ControlService {

    tiles: Tile[][] = [];
    victory: boolean = false;
    sidebarState: boolean = false;
    difficultyName: string = 'EASY';

    constructor(
        private generationService: GenerationService,
        private boardCheckService: BoardChecksService,
        private timerService: TimerService
    ) {
        this.tiles = generationService.reset_board();
    }

    /**
     * Calls to reset a board and victory status
     */
    reset_board(): void {
        this.victory = false;
        this.tiles = this.generationService.reset_board();
        this.timerService.start_timer();
    }

    /**
     * Checks to see if a user has won the game
     * @returns 
     */
    check_victory(): void {
        for ( let i = 0; i < this.tiles.length; i++ ) {
            for (let j = 0; j < this.tiles[ 0 ].length; j++) {
                if( !this.tiles[ i ][ j ].value || !this.boardCheckService.check_all( this.tiles, i, j, this.tiles[ i ][ j ].value ?? -1 ) ) {
                    this.victory = false;
                    return;
                }
            }
        }
        this.victory = true;
        this.timerService.end_timer();
    }

    /**
     * Toggles the state of the sidebar
     * @param force Forces the state of the sidebar to a specific value
     */
    toggle_sidebar( force?: boolean ): void {
        this.sidebarState = ( force !== undefined ) ? force : !this.sidebarState;
    }

    /**
     * Calls to change the difficulty of the game
     * @param difficulty Difficulty value being set
     */
    change_difficulty( difficulty: Difficulty ): void {
        this.tiles = this.generationService.reset_board( difficulty );
        this.timerService.start_timer();
    }
}
