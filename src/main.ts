import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ForbiddenException,ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Ocso API')
  .setDescription('Api for ocso mangment')
  .setVersion('0.9')  
  .addBearerAuth()
  .build();
const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, documentFactory)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,    
  }));

  const port = process.env.PORT || 30000;
  await app.listen(port);
  console.log(`App runnin on${port}`)
}
bootstrap();
