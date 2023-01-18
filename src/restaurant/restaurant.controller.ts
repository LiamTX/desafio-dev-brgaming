import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Restaurant } from './entities/restaurant.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateRestaurantHoursDto } from './dto/update-restaurant-hours.dto';
import { RestaurantHours } from './entities/restaurant-hours.entity';

@ApiTags('Restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @ApiOperation({ description: 'Create new restaurant if not exists' })
  @ApiBody({ type: CreateRestaurantDto })
  @ApiCreatedResponse({ type: Restaurant, description: 'Restaurant created' })
  @ApiBadRequestResponse({ description: 'Restaurant already exists with this name' })
  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    return await this.restaurantService.createRestaurant(createRestaurantDto);
  }

  @ApiOperation({ description: 'List all restaurants' })
  @ApiResponse({ type: [Restaurant] })
  @Get()
  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantService.findAllRestaurants();
  }

  @ApiOperation({ description: 'List one restaurant by id' })
  @ApiResponse({ type: Restaurant })
  @ApiNotFoundResponse({ description: 'Restaurant not found with this id' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Restaurant> {
    return await this.restaurantService.findRestaurantById(id);
  }

  @ApiOperation({ description: 'Update one restaurant by id' })
  @ApiBody({ type: UpdateRestaurantDto })
  @ApiNotFoundResponse({ description: 'Restaurant not found with this id' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto): Promise<UpdateResult> {
    return await this.restaurantService.updateRestaurant(id, updateRestaurantDto);
  }

  @ApiOperation({ description: 'Delete one restaurant by id' })
  @ApiNotFoundResponse({ description: 'Restaurant not found with this id' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.restaurantService.removeRestaurant(id);
  }

  @ApiOperation({ description: 'Find the restaurant hours by restaurant id' })
  @ApiResponse({ type: RestaurantHours })
  @ApiNotFoundResponse({ description: 'Restaurant not found with this id' })
  @Get('hours/:id')
  async findRestaurantHoursByRestaurantId(@Param('id') id: string): Promise<RestaurantHours> {
    return await this.restaurantService.findRestaurantHoursByRestaurantId(id);
  }

  @ApiOperation({ description: 'Update one restaurant hours by id' })
  @ApiBody({ type: UpdateRestaurantHoursDto })
  @ApiNotFoundResponse({ description: 'Restaurant not found with this id' })
  @Put('hours/:id')
  async updateRestaurantHoursByRestaurantId(@Param('id') id: string, @Body() data: UpdateRestaurantHoursDto) {
    return await this.restaurantService.updateRestaurantHoursByRestaurantId(id, data);
  }

  @Post('isOpen/:id')
  async restaurantIsOpen(@Param('id') id: string) {
    return await this.restaurantService.restaurantIsOpen();
  }
}
