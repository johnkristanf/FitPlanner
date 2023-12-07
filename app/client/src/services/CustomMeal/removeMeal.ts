import axios from 'axios';
import { mealDataTobeDeletedTypes } from '../../lib/types/MealPlans';

export const removeMeal = async (mealDataTobeDeleted: mealDataTobeDeletedTypes) => {

    const response = await axios.delete('http://fitplanner-server.onrender.com/custom-meals', { data: mealDataTobeDeleted });
    
    return response.data
}



