import { Component } from '@angular/core';
import { TileState } from 'src/app/enums/tile-state';
import { Tile } from 'src/app/interfaces/tile';
import { ControlService } from 'src/app/services/control/control.service';

@Component( {
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: [ './board.component.scss' ]
} )
export class BoardComponent {

    constructor( public controlService: ControlService ) {}

    /**
     * Runs a function to set a cell value on value change
     * @param value Value being set
     * @param row Row value is being set on
     * @param column Column value is being set on
     */
    on_cell_change( value: number, row: number, column: number ): void {
        this.controlService.tiles[ row ][ column ].value = value;
    }

    /**
     * Checks to see if a cell should be considered as disabled
     * @param cell Cell being checked
     * @returns True if cell should be disabled
     */
    check_disabled( cell: Tile ): boolean {
        return cell.state === TileState.Default;
    }

    /**
     * Gets the value to show on a board cell
     * @param cell Cell being checked
     * @returns Cell value
     */
    get_cell_value( cell: Tile ): number | undefined {
        if( !this.controlService.playing ) { return }
        return cell.showExpected ? cell.expectedValue : cell.value;
    }
}
