import axios from 'axios';

export const findMeal = async () => {

    const response = await axios.get('https://fitplanner-server.onrender.com/custom-meals');

    return response.data
}



