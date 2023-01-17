import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant) private readonly restaurantRepository: Repository<Restaurant>
  ) { }

  async create(data: CreateRestaurantDto): Promise<Restaurant> {
    const restaurantExists = await this.restaurantRepository.findOne({ where: { name: data.name } });
    if (restaurantExists) {
      throw new HttpException('restaurant_already_exists', HttpStatus.BAD_REQUEST);
    }

    return await this.restaurantRepository.save(data);
  }

  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantRepository.find();
  }

  async findOne(id: string): Promise<Restaurant> {
    return await this.restaurantRepository.findOne({ where: { id } });
  }

  async update(id: string, data: UpdateRestaurantDto): Promise<UpdateResult> {
    const restaurantExists = await this.restaurantRepository.findOne({ where: { id } });
    if (restaurantExists) {
      throw new HttpException('restaurant_not_exists', HttpStatus.NOT_FOUND);
    }

    return await this.restaurantRepository.update(id, data);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.restaurantRepository.delete(id);
  }
}
