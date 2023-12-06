import axios from 'axios';
import { mealDataTobeDeletedTypes } from '../../lib/types/MealPlans';

export const removeMeal = async (mealDataTobeDeleted: mealDataTobeDeletedTypes) => {

    const response = await axios.delete('/server/custom-meals', { data: mealDataTobeDeleted });
    
    return response.data
}



