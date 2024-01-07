import express from 'express';
import { NestFactory } from '@nestjs/core';

const app = express();

async function main() {
    const app = await NestFactory.create( WebsocketModule );

    await app.listen( 3000, () => {
        console.log( 'Server started on port 3000' );
    } );
}
