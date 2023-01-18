import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantHours } from './entities/restaurant-hours.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, RestaurantHours])],
  controllers: [RestaurantController],
  providers: [RestaurantService]
})
export class RestaurantModule { }
