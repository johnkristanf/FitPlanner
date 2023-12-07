import axios from 'axios';

import { ExercisesType, ExerciseApiResponseType } from '../lib/types/Exercises';

export const fetchExercisesbyAttributes = async (exerciseData: ExercisesType): Promise<ExerciseApiResponseType[]> => {

    const response = await axios.post('https://fitplanner-server.onrender.com/api/exercises', exerciseData);

    return response.data
}


export const fetchAllExercises = async (): Promise<ExerciseApiResponseType[]> => {

    const response = await axios.get('https://fitplanner-server.onrender.com/api/exercises');

    return response.data
}
