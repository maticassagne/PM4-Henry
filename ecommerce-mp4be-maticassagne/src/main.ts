import ENV from 'config/enviroments';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(ENV.APP_PORT ?? 3000);
  console.log(`Server listening on port ${ENV.APP_PORT}!`);
}
bootstrap();
