import { Component } from '@angular/core';
import { ControlService } from './services/control/control.service';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent {

    title = 'sudoku';

    constructor( public controlService: ControlService ) {}

}
