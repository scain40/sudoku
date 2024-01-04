import { Component } from '@angular/core';
import { BaseModalComponent } from '../base/base-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { StatsService } from 'src/app/services/stats/stats.service';

@Component( {
    selector: 'stats-modal',
    templateUrl: './stats-modal.component.html',
    styleUrls: [ './stats-modal.component.scss' ]
} )
export class StatsModalComponent extends BaseModalComponent {

    constructor( public override dialog: MatDialog, private statsService: StatsService ) {
        super( dialog );
    }

    /**
     * Gets the win percent for a specified difficulty
     * @param difficulty Diffiuclty being fetched
     * @returns Win percentage
     */
    get_win_percent( difficulty: string ): string {
        if( this.statsService.stats[ difficulty ].total === 0 ) {
            return '0%';
        }
        return ( ( 100 / this.statsService.stats[ difficulty ].total ) * this.statsService.stats[ difficulty ].wins ) + '%';
    }
}
