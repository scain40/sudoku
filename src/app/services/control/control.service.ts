import { Injectable } from '@angular/core';
import { Tile } from '../../interfaces/tile';
import { GenerationService } from '../generation/generation.service';
import { BoardChecksService } from '../board-checks/board-checks.service';
import { Difficulty } from 'src/app/enums/difficulty';
import { TimerService } from '../timer-service/timer.service';
import { UtilsService } from '../utils/utils.service';
import { TileState } from 'src/app/enums/tile-state';
import { StatsService } from '../stats/stats.service';

@Injectable( {
    providedIn: 'root'
} )
export class ControlService {

    tiles: Tile[][] = [];
    victory: boolean = false;
    loss: boolean = false;
    sidebarState: boolean = false;
    difficultyName: string = 'EASY';
    hintCount: number = 3;
    playing: boolean = false;

    constructor(
        private GenerationService: GenerationService,
        private boardCheckService: BoardChecksService,
        private timerService: TimerService,
        private utils: UtilsService,
        private statsService: StatsService
    ) {
        this.tiles = GenerationService.reset_board();
    }

    /**
     * Calls to reset a board and victory status
     * @param difficulty Optional setting of a difficulty when resetting the board
     */
    reset_board( difficulty?: Difficulty ): void {
        this.victory = false;
        this.loss = false;
        this.playing = false;
        this.hintCount = 3;
        this.tiles = this.GenerationService.reset_board( difficulty );
    }

    /**
     * Checks to see if a user has won the game
     */
    check_victory(): void {
        const difficulty = this.GenerationService.difficulty;
        for ( let i = 0; i < this.tiles.length; i++ ) {
            for (let j = 0; j < this.tiles[ 0 ].length; j++) {
                if( !this.tiles[ i ][ j ].value || !this.boardCheckService.check_all( this.tiles, i, j, this.tiles[ i ][ j ].value ?? -1 ) ) {
                    this.loss = true;
                    this.statsService.add_loss( difficulty );
                    this.timerService.end_timer();
                    return;
                }
            }
        }
        this.victory = true;
        this.statsService.add_victory( difficulty );
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

    /**
     * Starts the game
     */
    start_game(): void {
        this.playing = true;
        this.timerService.start_timer();
    }
}
