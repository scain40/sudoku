import { Injectable } from '@angular/core';
import { Tile } from '../../interfaces/tile';
import { GenerationService } from '../generation/generation.service';
import { BoardChecksService } from '../board-checks/board-checks.service';
import { Difficulty } from 'src/app/enums/difficulty';
import { TimerService } from '../timer-service/timer.service';
import { UtilsService } from '../utils/utils.service';
import { TileState } from 'src/app/enums/tile-state';

@Injectable( {
    providedIn: 'root'
} )
export class ControlService {

    tiles: Tile[][] = [];
    victory: boolean = false;
    sidebarState: boolean = false;
    difficultyName: string = 'EASY';
    hintCount: number = 3;

    constructor(
        private generationService: GenerationService,
        private boardCheckService: BoardChecksService,
        private timerService: TimerService,
        private utils: UtilsService
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

    /**
     * Gives a hint to the user
     */
    hint(): void {
        if( this.hintCount <= 0 ) { return; }
        let coordinatesList: { x: number, y: number }[] = [];
        for( let i = 0; i < this.tiles.length; i++ ) {
            for( let j = 0; j < this.tiles[ 0 ].length; j++ ) {
                coordinatesList.push( { x: i, y: j } );
            }
        }
        coordinatesList = this.utils.shuffle_array( coordinatesList, 10000 );
        for( let coordinates of coordinatesList ) {
            if( !this.tiles[ coordinates.x ][ coordinates.y ].showExpected ) {
                this.hintCount--;
                this.tiles[ coordinates.x ][ coordinates.y ].value = this.tiles[ coordinates.x ][ coordinates.y ].expectedValue;
                this.tiles[ coordinates.x ][ coordinates.y ].showExpected = true;
                this.tiles[ coordinates.x ][ coordinates.y ].state = TileState.Default;
                return;
            }
        }
    }
}
