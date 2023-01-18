import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantHoursDto } from './dto/update-restaurant-hours.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantHours } from './entities/restaurant-hours.entity';
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

  async updateRestaurantHoursByRestaurantId(id: string, data: UpdateRestaurantHoursDto) {
    const restaurant = await this.restaurantRepository.findOne({ where: { id } });
    if (!restaurant) {
      throw new HttpException('restaurant_not_exists', HttpStatus.NOT_FOUND);
    }

    console.log(data);
    Object.keys(data).forEach(item => {
      console.log(data[item]);
    })
  }

  async restaurantIsOpen() {
    return new Date().toLocaleString();
  }
}
