import { Component } from '@angular/core';
import { ControlService } from 'src/app/services/control/control.service';

@Component( {
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.scss' ]
} )
export class HeaderComponent {

    constructor( protected controlService: ControlService ) {}
}
