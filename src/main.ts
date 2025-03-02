import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ForbiddenException,ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,    
  }));

  const port = process.env.PORT || 30000;
  await app.listen(port);
  console.log(`App runnin on${port}`)
}
bootstrap();
