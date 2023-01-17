import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Restaurant } from './entities/restaurant.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@ApiTags('Restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @ApiOperation({ description: 'Create new restaurant if not exists'})
  @ApiBody({ type: CreateRestaurantDto })
  @ApiCreatedResponse({ type: Restaurant, description: 'Restaurant created' })
  @ApiBadRequestResponse({ description: 'Restaurant already exists with this name' })
  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    return await this.restaurantService.create(createRestaurantDto);
  }

  @ApiOperation({ description: 'List all restaurants'})
  @ApiResponse({ type: [Restaurant] })
  @Get()
  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantService.findAll();
  }

  @ApiOperation({ description: 'List one restaurant by id'})
  @ApiResponse({ type: Restaurant })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Restaurant> {
    return await this.restaurantService.findOne(id);
  }

  @ApiOperation({ description: 'Update one restaurant by id'})
  @ApiBody({ type: UpdateRestaurantDto })
  @ApiNotFoundResponse({ description: 'Restaurant not found with this id' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto): Promise<UpdateResult> {
    return await this.restaurantService.update(id, updateRestaurantDto);
  }

  @ApiOperation({ description: 'Delete one restaurant by id'})
  @ApiNotFoundResponse({ description: 'Restaurant not found with this id' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.restaurantService.remove(id);
  }
}
