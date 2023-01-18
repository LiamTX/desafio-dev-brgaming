import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { mapSeries } from 'p-iteration';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantHoursDto } from './dto/update-restaurant-hours.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { VerifyIfRestaurantIsOpenDto } from './dto/verify-restaurant-isOpen.dto';
import { hoursRange, RestaurantHours } from './entities/restaurant-hours.entity';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant) private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(RestaurantHours) private readonly restaurantHoursRepository: Repository<RestaurantHours>
  ) { }

  private async createRestaurantHours(restaurant: Restaurant): Promise<RestaurantHours> {
    return await this.restaurantHoursRepository.save({ restaurant });
  }

  async createRestaurant(data: CreateRestaurantDto): Promise<Restaurant> {
    const restaurantExists = await this.restaurantRepository.findOne({ where: { name: data.name } });
    if (restaurantExists) {
      throw new HttpException('restaurant_already_exists', HttpStatus.BAD_REQUEST);
    }

    const restaurant = await this.restaurantRepository.save(data);
    await this.createRestaurantHours(restaurant);
    return restaurant;
  }

  async findAllRestaurants(): Promise<Restaurant[]> {
    return await this.restaurantRepository.find({ relations: ['restaurantHours'] });
  }

  async findRestaurantById(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id } });
    if (!restaurant) {
      throw new HttpException('restaurant_not_exists', HttpStatus.NOT_FOUND);
    }

    return restaurant;
  }

  async updateRestaurant(id: string, data: UpdateRestaurantDto): Promise<UpdateResult> {
    const restaurantExists = await this.restaurantRepository.findOne({ where: { id } });
    if (!restaurantExists) {
      throw new HttpException('restaurant_not_exists', HttpStatus.NOT_FOUND);
    }

    return await this.restaurantRepository.update(id, data);
  }

  async removeRestaurant(id: string): Promise<DeleteResult> {
    const restaurantExists = await this.restaurantRepository.findOne({ where: { id } });
    if (!restaurantExists) {
      throw new HttpException('restaurant_not_exists', HttpStatus.NOT_FOUND);
    }

    return await this.restaurantRepository.delete(id);
  }

  async findRestaurantHoursByRestaurantId(id: string): Promise<RestaurantHours> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id } });
    if (!restaurant) {
      throw new HttpException('restaurant_not_exists', HttpStatus.NOT_FOUND);
    }

    return await this.restaurantHoursRepository.findOne({
      where: { restaurant: { id } }
    });
  }

  async updateRestaurantHoursByRestaurantId(id: string, data: UpdateRestaurantHoursDto): Promise<UpdateResult> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id }, relations: ['restaurantHours'] });
    if (!restaurant) {
      throw new HttpException('restaurant_not_exists', HttpStatus.NOT_FOUND);
    }

    console.log(data)

    for (const property in data) {
      for (const item of data[property]) {
        const startTime = item.startTime;
        const endTime = item.endTime;

        if (!startTime) {
          throw new HttpException({
            message: 'startTime_missing',
            error: item
          }, HttpStatus.BAD_REQUEST);
        }

        if (!endTime) {
          throw new HttpException({
            message: 'endTime_missing',
            error: item
          }, HttpStatus.BAD_REQUEST);
        }

        if (!startTime.includes(':') || !endTime.includes(':')) {
          throw new HttpException({
            message: 'unknow_hour_format',
            error: item
          }, HttpStatus.BAD_REQUEST);
        }

        if (
          isNaN(startTime.split(':')[0]) || isNaN(startTime.split(':')[1]) ||
          isNaN(endTime.split(':')[0]) || isNaN(endTime.split(':')[1])
        ) {
          throw new HttpException({
            message: 'unknow_hour_format',
            error: item
          }, HttpStatus.BAD_REQUEST);
        }

        if (Number(startTime.split(':')[0]) >= Number(endTime.split(':')[0])) {
          throw new HttpException({
            message: 'the_startTime_cannot_be_greater_than_the_end_time',
            error: item
          }, HttpStatus.BAD_REQUEST);
        }
      }
    }

    return await this.restaurantHoursRepository.update(restaurant.restaurantHours.id, data);
  }

  async verifyIfRestaurantIsOpen(id: string, data: VerifyIfRestaurantIsOpenDto): Promise<boolean> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id }, relations: ['restaurantHours'] });
    if (!restaurant) {
      throw new HttpException('restaurant_not_exists', HttpStatus.NOT_FOUND);
    }

    if (!data.dateTime) {
      throw new HttpException('dateTime_missing', HttpStatus.BAD_REQUEST);
    }

    const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const dateTimeDay = weekDays[new Date(data.dateTime).getDay()];
    const dateTimeHour = format(new Date(data.dateTime), 'HH:mm');

    const restaurantWeekDayHours: hoursRange[] | null = restaurant.restaurantHours[dateTimeDay];
    if (restaurantWeekDayHours) {
      let isOpen = false;

      await mapSeries(restaurantWeekDayHours, async hour => {
        const dateTimeHourFormated = new Date();
        dateTimeHourFormated.setHours(Number(dateTimeHour.split(':')[0]), Number(dateTimeHour.split(':')[1]));
        const startTimeHourFormated = new Date();
        startTimeHourFormated.setHours(Number(hour.startTime.split(':')[0]), Number(hour.startTime.split(':')[1]));
        const endTimeHourFormated = new Date();
        endTimeHourFormated.setHours(Number(hour.endTime.split(':')[0]), Number(hour.endTime.split(':')[1]));

        if (dateTimeHourFormated.getTime() >= startTimeHourFormated.getTime() && dateTimeHourFormated.getTime() <= endTimeHourFormated.getTime()) {
          isOpen = true;
        } else {
          isOpen = isOpen ? true : false;
        }
      });

      return isOpen ? true : false;
    }

    return false;

  }
}
