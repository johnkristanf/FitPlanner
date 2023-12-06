import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CustomMealsService } from './custom_meals.service';
import { CreateCustomMealDto } from './dto/create-custom_meal.dto';
import { UpdateCustomMealDto } from './dto/update-custom_meal.dto';

import { CacheInterceptor } from '@nestjs/cache-manager';
import { UseInterceptors } from '@nestjs/common/decorators';

import { mealDataTobeDeletedTypes } from 'src/lib/types/CustomMealTypes';


@Controller('custom-meals')
@UseInterceptors(CacheInterceptor)
export class CustomMealsController {
  
  constructor(private readonly customMealsService: CustomMealsService) {}

  @Post()
  async create(@Body() createCustomMealDto: CreateCustomMealDto) {
    return this.customMealsService.create(createCustomMealDto);

  }


  @Get()
  findAll() {
    return this.customMealsService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customMealsService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomMealDto: UpdateCustomMealDto) {
    return this.customMealsService.update(+id, updateCustomMealDto);
  }
  

  @Delete()
  remove(@Body() mealDataTobeDeleted: mealDataTobeDeletedTypes) {
    console.log('mealDataTobeDeleted', mealDataTobeDeleted.Mealcontents_id);
    return this.customMealsService.remove(mealDataTobeDeleted);
  }
}
