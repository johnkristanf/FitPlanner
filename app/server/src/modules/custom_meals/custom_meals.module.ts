import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';


import { CustomMealsService } from './custom_meals.service';
import { CustomMealsController } from './custom_meals.controller';
import { CustomMealSchema } from 'src/schema/custom_meals';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'custom-meals', schema: CustomMealSchema }]),

    CacheModule.register({ 
      ttl: 5, 
      max: 10,
    }),

  ],

  controllers: [CustomMealsController],

  providers: [CustomMealsService],

})
export class CustomMealsModule {}
