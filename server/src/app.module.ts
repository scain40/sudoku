import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StatsGateway } from './gateways/stats-gateway';

@Module( {
    imports: [],
    controllers: [
        AppController
    ],
    providers: [
        StatsGateway
    ],
} )
export class AppModule {}
