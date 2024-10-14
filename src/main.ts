import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.use(json({ limit: '4mb' }));
  app.use(urlencoded({ extended: true, limit: '4mb' }));
  await app.listen(3000);
}
bootstrap();
