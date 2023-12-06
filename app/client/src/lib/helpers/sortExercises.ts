import { ExerciseApiResponseType } from "../types/Exercises";

export const sortExercises = (data: ExerciseApiResponseType[]) => {

    const customSort = (a: any, b: any) => {

        const nameA = a.name.length;
        const nameB = b.name.length;
  
        if (nameA > nameB) {
           return 1;

        } else if (nameA < nameB) {
           return -1; 

        } else {
           return 0; 
        }
    }
  
  data.sort(customSort);

  return data
}  
 
  
