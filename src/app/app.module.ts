// Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GameClockComponent } from './components/game-clock/game-clock.component';
import { BaseModalComponent } from './components/modals/base/base-modal.component';
import { StatsModalComponent } from './components/modals/stats/stats-modal.component';

// Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule( {
    declarations: [
        AppComponent,
        BoardComponent,
        HeaderComponent,
        SidebarComponent,
        GameClockComponent,
        BaseModalComponent,
        StatsModalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        MatToolbarModule,
        MatDialogModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
} )
export class AppModule {}
