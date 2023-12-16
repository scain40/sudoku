import { Injectable } from '@angular/core';
import { Tile } from '../../interfaces/tile';
import { GenerationService } from '../generation/generation.service';
import { BoardChecksService } from '../board-checks/board-checks.service';

@Injectable( {
    providedIn: 'root'
} )
export class ControlService {

    tiles: Tile[][] = [];
    victory: boolean = false;

    constructor(private generationService: GenerationService, private boardCheckService: BoardChecksService) {
        this.tiles = generationService.reset_board();
    }

    /**
     * Calls to reset a board and victory status
     */
    reset_board(): void {
        this.victory = false;
        this.tiles = this.generationService.reset_board();
    }

    /**
     * Checks to see if a user has won the game
     * @returns 
     */
    check_victory(): void {
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[0].length; j++) {
                if( !this.tiles[ i ][ j ].value || !this.boardCheckService.check_all( this.tiles, i, j, this.tiles[ i ][ j ].value ?? -1 ) ) {
                    this.victory = false;
                    return;
                }
            }
        }
        this.victory = true;
    }
}
