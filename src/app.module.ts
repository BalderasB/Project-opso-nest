import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { ProvidersModule } from './providers/providers.module';
import { ManagersModule } from './managers/managers.module';
import { LocationsModule } from './locations/locations.module';
import { RegionsModule } from './regions/regions.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_IN, JWT_KEY } from 'src/constants/jwt.constants';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: {
        expiresIn: EXPIRES_IN 
      },
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.host,
      port: Number(process.env.DB_PORT),
      username: 'postgres',
      password: process.env.pass, 
      database: process.env.name,  // Aquí se usa la variable del .env
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }), EmployeesModule, ProductsModule, ProvidersModule, ManagersModule, LocationsModule, RegionsModule, AuthModule
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}