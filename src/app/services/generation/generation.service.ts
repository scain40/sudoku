import { Injectable } from '@angular/core';
import { Difficulty } from '../../enums/difficulty';
import { Tile } from '../../interfaces/tile';
import { TileState } from '../../enums/tile-state';
import { BoardChecksService } from '../board-checks/board-checks.service';
import { UtilsService } from '../utils/utils.service';

@Injectable( {
    providedIn: 'root'
} )
export class GenerationService {

    private boardValid: boolean = true;
    difficulty: Difficulty = Difficulty.EASY;

    private boardSize = 6;
    private dificultyHints: { [ key in Difficulty ]: number } = {
        [ Difficulty.TEST ]: 0,
        [ Difficulty.EASY ]: 20,
        [ Difficulty.MEDIUM ]: 40,
        [ Difficulty.HARD ]: 60,
        [ Difficulty.EXPERT ]: 80
    };

    private mixCount = 1000;
    private coordinatesList: { x: number, y: number }[] = [];

    constructor( private boardChecksService: BoardChecksService, private utils: UtilsService ) {}

    /**
     * Resets a game board
     * @returns Generated reset game board
     */
    reset_board( difficulty?: Difficulty ): Tile[][] {
        this.boardValid = true;
        if( difficulty ) {
            this.difficulty = difficulty;
        }
        let tiles: Tile[][] = [];
        for (let i = 0; i < this.boardSize; i++) {
            tiles[ i ] = [];
            for ( let j = 0; j < this.boardSize; j++ ) {
                tiles[ i ][ j ] = { state: TileState.UserSet, showExpected: true };
            }
        }
        return this.generate_board( tiles );
    }

    /**
     * Generates a game board
     * @param board Board being generated
     * @returns Generated board
     */
    generate_board( board: Tile[][] ): Tile[][] {
        let settingNumber = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
        let numberOccurance = ( this.boardSize *  this.boardSize ) / settingNumber.length;
        this.generate_coordinates_list();
        settingNumber.forEach( ( value ) => {
            for( let i = 0; i < numberOccurance; i++ ) {
                this.place_number( value, board );
            }
        } );
        if( !this.boardValid ) {
            return this.reset_board();
        }
        return board;
    };

    /**
     * Generates a list of coordinates for the board
     */
    generate_coordinates_list(): void {
        this.coordinatesList = [];
        for( let i = 0; i < this.boardSize; i++ ) {
            for( let j = 0; j < this.boardSize; j++ ) {
                this.coordinatesList.push( { x: i, y: j } );
            }
        }
        this.coordinatesList = this.utils.shuffle_array( this.coordinatesList, this.mixCount );
    }

    /**
     * Calls to place a number on the board. If the number cannot be placed, the board is marked as invalid.
     * @param number Number being checked
     * @param board Board being checked against
     */
    place_number( number: number, board: Tile[][] ): void {
        for( let coordinate in this.coordinatesList ) {
            let coordinates = this.coordinatesList[ coordinate ];
            if( this.boardChecksService.check_all( board, coordinates.x, coordinates.y, number ) ) { continue; }
            board[ coordinates.x ][ coordinates.y ].expectedValue = number;
            if( ( Math.random() * 100 ) > this.dificultyHints[ this.difficulty ] ) {
                board[ coordinates.x ][ coordinates.y ].value = number;
                board[ coordinates.x ][ coordinates.y ].state = TileState.Default;
                board[ coordinates.x ][ coordinates.y ].showExpected = true;
            } else {
                board[ coordinates.x ][ coordinates.y ].showExpected = false;
                board[ coordinates.x ][ coordinates.y ].state = TileState.UserSet;
            }
            this.coordinatesList.splice( parseInt( coordinate ), 1 );
            return;
        };
        this.boardValid = false;
    }

}
