import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component( {
    selector: 'base-modal',
    templateUrl: './base-modal.component.html',
    styleUrls: ['./base-modal.component.scss']
} )
export class BaseModalComponent {

    constructor( public dialog: MatDialog ) {}

    /**
     * Closes all open dialog windows
     */
    close_modal(): void {
        this.dialog.closeAll();
    }

}
