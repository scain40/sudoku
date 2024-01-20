import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable( {
    providedIn: 'root'
} )
export class WebsocketService {

    socket: Socket;

    constructor() {
        this.socket = io('http://localhost:3000/', {
            transports: [ "websocket" ],
			withCredentials: false
		} );
        this.socket.on( 'connect', this.connected.bind( this ) );
        this.socket.on( 'disconnect', this.disconnected.bind( this ) );
    }

    /**
     * Handles functions needed after websocket connection
     */
    connected(): void {
        console.log( 'Connected to server' );
    }

    /**
     * Handles functions needed after websocket disconnection
     */
    disconnected(): void {
        console.log( 'Disconnected from server' );
    }
}
