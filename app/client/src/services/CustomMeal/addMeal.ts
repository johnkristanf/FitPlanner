import axios from 'axios';

export const addCustomMeal = async (customMealData: any) => {

    const response = await axios.post('/server/custom-meals', customMealData);

    return response.data
}



