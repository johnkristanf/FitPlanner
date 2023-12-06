import axios from 'axios';

import { MealPlansType, MealPlansApiResponseType } from '../lib/types/MealPlans';


export const fetchMealPlans = async (mealPlansData: MealPlansType): Promise<MealPlansApiResponseType> => {

    const response = await axios.post('/server/api/meal-plan', mealPlansData);

    return response.data
}

