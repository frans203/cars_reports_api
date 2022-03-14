import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSessions = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.port || 3000);
}
bootstrap();
