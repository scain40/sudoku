import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatsModalComponent } from 'src/app/components/modals/stats/stats-modal.component';
import { Difficulty } from 'src/app/enums/difficulty';
import { DefaultDifficultyStats, DifficultyStats } from 'src/app/interfaces/stats';

@Injectable( {
    providedIn: 'root'
} )
export class StatsService {

    stats: { [ key: string ]: DifficultyStats } = {};

    constructor( private dialog: MatDialog ) {
        this.get_stats();
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
        this.update_stats();
    }

    /**
     * Adds a loss to the loss count
     * @param difficulty Difficulty loss is being added for
     */
    add_loss( difficulty: Difficulty ): void {
        this.stats[ difficulty ].losses++;
        this.stats[ difficulty ].total++;
        this.update_stats();
    }

    /**
     * Updates the stoage of statistics
     * TODO Move out of localstorage
     */
    update_stats(): void {
        window.localStorage.setItem( 'statistics', JSON.stringify( this.stats ) );
    }

    /**
     * Gets statistics from storage
     * TODO Move out of localstorage
     */
    get_stats(): void {
        let stats = window.localStorage.getItem( 'statistics' );
        if( stats ) {
            this.stats = JSON.parse( stats );
            return;
        }
        // Default state for statistics
        this.stats = {};
        this.stats[ Difficulty.EASY ] = Object.assign( {}, DefaultDifficultyStats );
        this.stats[ Difficulty.MEDIUM ] = Object.assign( {}, DefaultDifficultyStats );
        this.stats[ Difficulty.HARD ] = Object.assign( {}, DefaultDifficultyStats );
        this.stats[ Difficulty.EXPERT ] = Object.assign( {}, DefaultDifficultyStats );
    }
}
