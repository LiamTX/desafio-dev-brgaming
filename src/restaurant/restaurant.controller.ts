import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return await this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  async findAll() {
    return await this.restaurantService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.restaurantService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return await this.restaurantService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.restaurantService.remove(id);
  }
}
