import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantHours } from './restaurant/entities/restaurant-hours.entity';
import { Restaurant } from './restaurant/entities/restaurant.entity';
import { RestaurantModule } from './restaurant/restaurant.module';

require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [Restaurant, RestaurantHours],
      synchronize: true,
      options: { encrypt: false }
    }),
    RestaurantModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
