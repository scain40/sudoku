import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatsModalComponent } from 'src/app/components/modals/stats/stats-modal.component';

@Injectable( {
    providedIn: 'root'
} )
export class StatsService {

    constructor(
        private dialog: MatDialog
    ) {}

    open_modal(): void {
        this.dialog.open( StatsModalComponent );
    }
}
