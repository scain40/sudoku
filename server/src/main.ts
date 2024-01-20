import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from "socket.io";
const cors = require( 'cors' );
const http = require('http');

let io: any;
async function bootstrap() {
  const app = await NestFactory.create( AppModule );
  const server = http.createServer( app );
  await app.listen( 3000 );
}
bootstrap();
