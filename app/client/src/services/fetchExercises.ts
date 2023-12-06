import axios from 'axios';

import { ExercisesType, ExerciseApiResponseType } from '../lib/types/Exercises';

export const fetchExercisesbyAttributes = async (exerciseData: ExercisesType): Promise<ExerciseApiResponseType[]> => {

    const response = await axios.post('/server/api/exercises', exerciseData);

    return response.data
}


export const fetchAllExercises = async (): Promise<ExerciseApiResponseType[]> => {

    const response = await axios.get('http://localhost:4000/server/api/exercises');

    return response.data
}
