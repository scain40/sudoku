import { Injectable } from '@angular/core';
import { Tile } from 'src/app/interfaces/tile';

@Injectable( {
    providedIn: 'root'
} )
export class BoardChecksService {

    constructor() { }

    /**
     * Returns true if the value is found in the horizontal, vertical, or sector of the board.
     * @param board Board being checked
     * @param x X value in board being checked
     * @param y Y value in board being checked
     * @param value Value being checked for the board tile
     * @returns True if value is found in the horizontal, vertical, or sector of the board
     */
    check_all( board: Tile[][], x: number, y: number, value: number ): boolean {
        return this.check_horizontal( board, x, value ) || this.check_vertical( board, y, value ) || this.check_sector( board, x, y, value );
    }

    /**
     * Checks horizontal row for a value
     * @param board 
     * @param x X value in board being checked
     * @param value Value being checked for the board tile
     * @returns True if the value is found
     */
    check_horizontal( board: Tile[][], x: number, value: number ): boolean {
        for ( let i = 0; i < board.length; i++ ) {
            if ( board[ x ][ i ].value === value ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks vertical row for a value
     * @param board 
     * @param x X value in board being checked
     * @param value Value being checked for the board tile
     * @returns True if the value is found
     */
    check_vertical( board: Tile[][], y: number, value: number ): boolean {
        for (let i = 0; i < board.length; i++) {
            if ( board[ i ][ y ].value === value ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks a sector for a value
     * @param board 
     * @param x X value in board being checked
     * @param value Value being checked for the board tile
     * @returns True if the value is found
     */
    check_sector( board: Tile[][], x: number, y: number, value: number ): boolean {
        let segmentX = Math.floor(x / 3);
        let segmentY = Math.floor(y / 3);
        for ( let xVal = segmentX * 3; xVal < segmentX * 3 + 3; xVal++ ) {
            for ( let yVal = segmentY * 3; yVal < segmentY * 3 + 3; yVal++ ) {
                if ( board[ xVal ][ yVal ].value === value ) {
                    return true;
                }
            }
        }
        return false;
    }
}
