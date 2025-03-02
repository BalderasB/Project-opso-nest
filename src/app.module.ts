import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.host,
      port: Number(process.env.DB_PORT),
      username: 'postgres',
      password: 'TheBestPassword', 
      database: process.env.name,  // Aquí se usa la variable del .env
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    })
    
  ],
})
export class AppModule {}