
interface CustomMeals {

    mealdata: {

      mealcontents: {
        title: string;
        readyInMinutes: number;
        servings: number;
        sourceUrl: string;
        _id:string
      }[];

      nutrients: {
        calories: number;
        protein: number;
        fat: number;
        carbohydrates: number;
        _id: string
        
      }[];
     

    };

    mealtype: String[]

  
}


interface MealPlans extends CustomMeals{

    week: {
      
        days: {

            meals: CustomMeals

            nutrients: CustomMeals
        },

    }[]
}


export interface CustomMealPlansType extends MealPlans, CustomMeals {}

interface removeMeal_WeekDayType {
  mealtype: string,
  weekday: string
  meal_id: string
}


export type mealDataTobeDeletedTypes = {
  Mealcontents_id: string,
  Nutrients_id: string,
  MealType_Weekday: removeMeal_WeekDayType
}

  