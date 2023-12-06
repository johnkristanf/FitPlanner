import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CacheTTL, CacheKey } from '@nestjs/cache-manager';
import { ApiService } from './api.service';

import { ExercisesType } from 'src/lib/types/Exercises';
import { MealPlansType } from 'src/lib/MealPlans';

import { CacheInterceptor } from '@nestjs/cache-manager';
import { UseInterceptors } from '@nestjs/common/decorators';


@Controller('api')
@UseInterceptors(CacheInterceptor)
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @CacheKey('ExercisesByAttributes')
  @CacheTTL(60) 
  @HttpCode(HttpStatus.OK)
  @Post('exercises')

  async FetchExercisesByAttributes(@Body() exercisesData: ExercisesType) {
    return this.apiService.ExercisesbyAttributes(exercisesData)
    
  }


  @CacheKey('AllExercises')
  @CacheTTL(60)
  @HttpCode(HttpStatus.OK)
  @Get('exercises')

  async FetchAllExercises() {
    return this.apiService.AllExercises()
    
  }


  @CacheKey('MealPlans')
  @CacheTTL(60) 
  @HttpCode(HttpStatus.OK)
  @Post('meal-plan')

  async FetchMealPlans(@Body() mealPlansData: MealPlansType) {
    return this.apiService.Meals(mealPlansData)
    
  }
}
