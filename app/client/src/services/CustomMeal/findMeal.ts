import axios from 'axios';

export const findMeal = async () => {

    const response = await axios.get('/server/custom-meals');

    return response.data
}



