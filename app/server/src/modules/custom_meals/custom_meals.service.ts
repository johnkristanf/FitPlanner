import { Model } from 'mongoose';

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateCustomMealDto } from './dto/create-custom_meal.dto';
import { UpdateCustomMealDto } from './dto/update-custom_meal.dto';
import { CustomMealPlansType } from 'src/lib/types/CustomMealTypes';
import { mealDataTobeDeletedTypes } from 'src/lib/types/CustomMealTypes';


@Injectable()
export class CustomMealsService {

  constructor(@InjectModel('custom-meals') private readonly CustomMealModel: Model<CustomMealPlansType>) {}


  async create(createCustomMealDto: CreateCustomMealDto): Promise<CustomMealPlansType> {

      const weekExisting = await this.CustomMealModel.findOne({ weekday: createCustomMealDto.weekday }).select('mealdata mealtype');

      
      if(weekExisting){

        if(weekExisting.mealtype.length >= 3){
          throw new HttpException('Meals Limit Exceeded For That Particular Day', HttpStatus.CONFLICT);
        } 

        
        if(weekExisting.mealtype.includes(createCustomMealDto.mealtype)) {
          throw new HttpException('Meal Type Already Exist', HttpStatus.CONFLICT);
        }


        switch (createCustomMealDto.mealtype) {

          case 'breakfast':
            this.ValidateMealType(createCustomMealDto, weekExisting, 0, 0)
            break;

          case 'lunch':
            this.ValidateMealType(createCustomMealDto, weekExisting, 1, 0)
            break;

          case 'dinner':
            this.ValidateMealType(createCustomMealDto, weekExisting, 2, 0)
            break;
        }

        return await weekExisting.save();


      }


      // IF MEAL WEEK DAY IS NOT EXISTING AUTOMATIC SAVE TO THE DB
        const customMeal = new this.CustomMealModel(createCustomMealDto);
        return await customMeal.save();

  }


  ValidateMealType(createCustomMealDto: any, weekExisting: any, insertIndex: number, removeData: number){

    const mealcontents = createCustomMealDto.mealdata.mealcontents;
    const nutrients = createCustomMealDto.mealdata.nutrients;
    const mealtype = createCustomMealDto.mealtype;

  
    weekExisting.mealdata.mealcontents.splice(insertIndex, removeData, mealcontents);
    weekExisting.mealdata.nutrients.splice(insertIndex, removeData, nutrients);
    weekExisting.mealtype.splice(insertIndex, removeData, mealtype);

  }


  async findAll(): Promise<CustomMealPlansType[]> {
    
    try {
      return await this.CustomMealModel.find({}).sort({ timeStamp: -1});

    } catch (error) {
      console.error(error);
      throw new HttpException('Error Finding Custom Meals', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} customMeal`;
  }

  update(id: number, updateCustomMealDto: UpdateCustomMealDto) {
    return `This action updates a #${id} customMeal`;
  }


  async remove(mealDataTobeDeleted: mealDataTobeDeletedTypes) {

    try {

      const mealdata = await this.CustomMealModel.findOne({ weekday: mealDataTobeDeleted.MealType_Weekday.weekday });
      console.log('mealDataTobeDeleted', mealDataTobeDeleted);
      console.log('mealdata.mealdata.mealcontents', mealdata.mealdata.mealcontents);
  
      mealdata.mealdata.mealcontents = mealdata.mealdata.mealcontents.filter((mealcontents) =>
           mealcontents._id.toString() !== mealDataTobeDeleted.Mealcontents_id
          );
  
      mealdata.mealdata.nutrients = mealdata.mealdata.nutrients.filter((nutrients) =>
            nutrients._id.toString() !== mealDataTobeDeleted.Nutrients_id
          );
  
      mealdata.mealtype = mealdata.mealtype.filter((mealtype: string) =>
            mealtype !== mealDataTobeDeleted.MealType_Weekday.mealtype
          );

        if(mealdata.mealtype.length === 0) await this.CustomMealModel.findByIdAndDelete(mealDataTobeDeleted.MealType_Weekday.meal_id)

      return await mealdata.save();

    
    } catch (error) {
      console.error(error);
      throw new HttpException('Error removing meal type', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  
}
