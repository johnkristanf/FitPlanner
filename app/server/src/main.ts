import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

console.log('MONGO_DB_URI', process.env.MONGO_DB_URI)


async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule, {
    
    cors: {
      origin: 'https://fitplanner.vercel.app',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Authorization', 'Content-Type'],
      credentials: true
    },

  });

  const configService = app.get(ConfigService);
  const port: number = parseInt(configService.get<string>('SERVER_PORT'))

  console.log('port', port)


  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  
}

bootstrap();
