import axios from 'axios';

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ExercisesType, ExerciseApiResponseType } from 'src/lib/types/Exercises';

import { MealPlansType, MealPlansApiResponseType } from 'src/lib/MealPlans';


@Injectable()
export class ApiService {

    constructor(private configService: ConfigService) {}

    async ExercisesbyAttributes (exercisesData: ExercisesType): Promise<ExerciseApiResponseType[]>{

        try { 
            const url = `https://api.api-ninjas.com/v1/exercises?muscle=${exercisesData.muscle}&type=${exercisesData.type}&difficulty=${exercisesData.difficulty}`; 
            
            const response = await axios.get(url, { 
                headers: { 
                    'X-Api-Key': this.configService.get<string>('EXERCISES_API_KEY')
                }
            }); 

            if(response.status === 200)  return response.data; 
    
    } catch (error) { 
        console.error(error); 
        throw new HttpException('Error Fetching Execises API', HttpStatus.INTERNAL_SERVER_ERROR); }
        
    }


    async AllExercises (): Promise<ExerciseApiResponseType[]>{

        try { 
            const url = `https://api.api-ninjas.com/v1/exercises?muscle=`; 
            
            const response = await axios.get(url, { 
                headers: { 
                    'X-Api-Key': this.configService.get<string>('EXERCISES_API_KEY')
                }
            }); 


            if(response.status === 200)  return response.data; 
    
    } catch (error) { 
        console.error(error); 
        throw new HttpException('Error Fetching Execises API', HttpStatus.INTERNAL_SERVER_ERROR); }
        
    }



    async Meals (mealPlansData: MealPlansType): Promise<MealPlansApiResponseType>{

        try { 

            const { timeframe, diet, targetCalories, excluded } = mealPlansData;

            const url = `https://api.spoonacular.com/mealplanner/generate?timeFrame=${timeframe}&targetCalories=${targetCalories}&diet=${diet}&excluded=${excluded}`; 
            
            const response = await axios.get(url, { 
                headers: { 
                    'X-Api-Key': this.configService.get<string>('MEALS_API_KEY')
                }
            }); 

            if(response.status === 200)  return response.data; 
    
        } catch (error) { 
            console.error(error); 
            throw new HttpException('Error Fetching Meal Plans API', HttpStatus.INTERNAL_SERVER_ERROR); }
        
        }



}
