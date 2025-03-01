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
      port: parseInt(process.env.port || '5432', 10),
      username: 'postgres',
      password: 'TheBestPassword', 
      database: process.env.name,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}