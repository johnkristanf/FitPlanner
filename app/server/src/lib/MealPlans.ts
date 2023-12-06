
export type MealPlansType = {
    timeframe: string,
    diet: string,
    targetCalories: number,
    excluded: string
}


interface OneDayMeal {

    meals: {
      id: number;
      imageType: string;
      title: string;
      readyInMinutes: number;
      servings: number;
      sourceUrl: string;
    }[];

    nutrients: {
      calories: number;
      protein: number;
      fat: number;
      carbohydrates: number;
    };
}


interface OneWeekMeal extends OneDayMeal{

    week: {
        monday: {

            meals: OneDayMeal

            nutrients: OneDayMeal
        },

        tuesday: {

            meals: OneDayMeal

            nutrients: OneDayMeal
        },

        wednesday: {

            meals: OneDayMeal

            nutrients: OneDayMeal
        },

        thursday: {

            meals: OneDayMeal

            nutrients: OneDayMeal
        },

        friday: {

            meals: OneDayMeal

            nutrients: OneDayMeal
        },

        saturday: {

            meals: OneDayMeal

            nutrients: OneDayMeal
        },


        sunday: {

            meals: OneDayMeal

            nutrients: OneDayMeal
        },
    }
}


export interface MealPlansApiResponseType extends OneDayMeal, OneWeekMeal {}
  