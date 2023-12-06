
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



export type CustomMealPlansType = {

    mealdata: {
        
        mealcontents:{
            readyInMinutes: number,
            servings: number,
            sourceUrl: string,
            title: string
        }[],

        nutrients: {
            calories: number,
            carbohydrates: number,
            fat: number,
            protein: number
        }[]

    };

    mealtype: string;
    weekday: string;
    _id: string
}



export type mealContenTypes = {
    
        mealcontents:{
            id: number,
            imageType: string,
            readyInMinutes: number,
            servings: number,
            sourceUrl: string,
            title: string
            _id: string
        },
   
}


export type nutrientsDataTypes = {

        nutrients: {
            calories: number,
            carbohydrates: number,
            fat: number,
            protein: number
            _id: string
        },
    
}

export interface removeMeal_WeekDayType {
    mealtype: string,
    weekday: string
    meal_id: string
}


export type mealDataTobeDeletedTypes = {
    Mealcontents_id: string,
    Nutrients_id: string,
    MealType_Weekday: removeMeal_WeekDayType
}





  