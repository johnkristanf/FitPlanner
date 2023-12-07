import axios from 'axios';

export const addCustomMeal = async (customMealData: any) => {

    const response = await axios.post('https://fitplanner-server.onrender.com/custom-meals', customMealData);

    return response.data
}



