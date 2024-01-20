import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { DefaultDifficultyStats, DifficultyStats, StatUpdate } from 'src/Interfaces/stats';
import { Difficulty } from 'src/enums/difficulty';

@WebSocketGateway( { transports: [ 'websocket' ] } )
export class StatsGateway {

    private stats: { [ key: string ]: DifficultyStats } = {};

    constructor() {
        this.set_default_stats();
        console.log( 'Created stats gateway' );
    }

    /**
     * Updates stats on the websocket for a particular difficulty
     * @param client Client updating difficulty
     * @param data Data being updated
     */
    @SubscribeMessage( 'update:stats' )
    handleEvent( client: any, @MessageBody() data: StatUpdate ): void {
        this.stats[ data.difficulty ] = data.details;
        client.emit( 'updated:stats' );
    }

    /**
     * Fetches stats from the websocket
     * @param client Client requesting stats
     */
    @SubscribeMessage( 'get:stats' )
    fetch_stats( client: any ): void {
        client.emit( 'return:stats', this.stats );
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
