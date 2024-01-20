import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatsModalComponent } from 'src/app/components/modals/stats/stats-modal.component';
import { Difficulty } from 'src/app/enums/difficulty';
import { DefaultDifficultyStats, DifficultyStats } from 'src/app/interfaces/stats';
import { WebsocketService } from '../websocket/websocket.service';

@Injectable( {
    providedIn: 'root'
} )
export class StatsService {

    stats: { [ key: string ]: DifficultyStats } = {};

    constructor( private dialog: MatDialog, private socket: WebsocketService ) {
        this.get_stats();
        this.socket.socket.on( 'return:stats', this.set_stats.bind( this ) );
    }

    /**
     * Opens the stats modal component
     */
    open_modal(): void {
        this.dialog.open( StatsModalComponent, { panelClass: 'stats-modal' } );
    }

    /**
     * Adds a victory to the win count
     * @param difficulty Difficulty win is being added for
     */
    add_victory( difficulty: Difficulty ): void {
        this.stats[ difficulty ].wins++;
        this.stats[ difficulty ].total++;
        this.update_stats( difficulty );
    }

    /**
     * Adds a loss to the loss count
     * @param difficulty Difficulty loss is being added for
     */
    add_loss( difficulty: Difficulty ): void {
        this.stats[ difficulty ].losses++;
        this.stats[ difficulty ].total++;
        this.update_stats( difficulty );
    }

    /**
     * Updates the stoage of statistics
     * @param difficulty Difficulty being updated
     */
    update_stats( difficulty: Difficulty ): void {
        this.socket.socket.emit( 'update:stats', { difficulty: difficulty, details: this.stats[ difficulty ] } );
    }

    /**
     * Gets statistics from storage
     */
    get_stats(): void {
        this.set_default_stats();
        this.socket.socket.emit( 'get:stats' );
    }

    /**
     * Calls to set the stats from a websocket response
     * @param stats Stats being returned from the websocket
     * @returns 
     */
    private set_stats( stats?: { [ key: string ]: DifficultyStats } ): void {
        if( stats ) {
            this.stats = stats;
            return;
        }
        this.set_default_stats();
    }

    /**
     * Sets up default stat values
     */
    private set_default_stats(): void {
        // Default state for statistics
        this.stats = {};
        this.stats[ Difficulty.EASY ] = Object.assign( {}, DefaultDifficultyStats );
        this.stats[ Difficulty.MEDIUM ] = Object.assign( {}, DefaultDifficultyStats );
        this.stats[ Difficulty.HARD ] = Object.assign( {}, DefaultDifficultyStats );
        this.stats[ Difficulty.EXPERT ] = Object.assign( {}, DefaultDifficultyStats );
    }
}
