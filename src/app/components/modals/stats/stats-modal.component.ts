import { Component } from '@angular/core';
import { BaseModalComponent } from '../base/base-modal.component';

@Component( {
    selector: 'stats-modal',
    templateUrl: './stats-modal.component.html',
    styleUrls: ['./stats-modal.component.scss']
} )
export class StatsModalComponent extends BaseModalComponent {}
