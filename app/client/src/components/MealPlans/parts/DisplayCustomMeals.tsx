import { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { classNames } from "./DisplayMeals";
import { findMeal } from "../../../services/CustomMeal/findMeal";
import { SortWeekDays } from "../../../lib/helpers/sortWeekdays";

import { removeMeal_WeekDayType,  CustomMealPlansType } from "../../../lib/types/MealPlans";
import { CustomMealsDataModal } from "./modal/CustomMealDataModal";




export const DisplayCustomMeals = ({ closeModal }: any) => {

    const [SortedCustomMealPlans, setSortedCustomMealPlans] = useState<CustomMealPlansType[]>([]);

    useEffect(() => {

        findMeal().then((meals) => {

            const sortedMeals = SortWeekDays(meals);
            setSortedCustomMealPlans(sortedMeals);

        });

    }, [SortedCustomMealPlans]); 

    const [isOpen, setisOpen] = useState<boolean>(false);
    const [Mealcontents, setMealcontents] = useState<string>();
    const [Nutrients, setNutrients] = useState<string>();
    
    const [MealType_Weekday, setMealType_Weekday] = useState<removeMeal_WeekDayType>({ 
        mealtype: '',
        weekday: '',
        meal_id: ''
    });



    const openCustomMealDataModal = (mealcontents: any, nutrients: any, mealtype: string, weekday: string, meal_id: string) => {
        setMealcontents(mealcontents)
        setNutrients(nutrients)

        setMealType_Weekday({
            mealtype: mealtype,
            weekday: weekday,
            meal_id: meal_id
        });

        setisOpen(true);
    }


    return(
    <>
            <div className="fixed flex w-11/12 justify-between items-center top-12 left-5" style={{ zIndex: 600 }}>
                <h1 className="text-white justify-self-center text-4xl font-bold">Custom Meals</h1>

                <FontAwesomeIcon onClick={() => closeModal(false)} 
                   className="text-5xl hover:opacity-75 text-white cursor-pointer" 
                   icon={faTimes} />

            </div>
        

            <div className="absolute  max-md:mt-32 max-sm:mt-20 max-md:left-[-10%] left-[-20%] flex max-sm:flex-col max-sm:w-full max-sm:mt-10 max-md:flex-col justify-center w-full top-12 bottom-0 right-0 left-0 m-auto gap-10" style={{ zIndex: 600 }}>

                {
                    
                    SortedCustomMealPlans.map((plan: CustomMealPlansType) => (

                        <div key={plan._id} className="w-1/2 h-32 max-md:w-4/5 max-md:h-96 bg-gray-300 p-5 rounded-md mt-10">

                                
                                <h1 className="text-orange-500 font-bold text-2xl">{plan.weekday}</h1>
                                

                                <div className="flex gap-3 mt-4">

                                    {
                                        Array.isArray(plan.mealtype) && plan.mealtype.map((data: string, index: any) => (

                                        <button 
                                            key={data}
                                            onClick={() => openCustomMealDataModal(plan.mealdata.mealcontents[index], plan.mealdata.nutrients[index], plan.mealtype[index], plan.weekday, plan._id)}

                                            className=
                                            {
                                               classNames('bg-slate-700 p-2 text-white rounded-md hover:opacity-75')
                                            }
                                            >

                                            {data}
                                        
                                        </button>

                                        ))
                                    }
                                   

                                </div>
                                      
                        </div>

                    ))
                }

                   { isOpen && <CustomMealsDataModal Mealcontents={Mealcontents} Nutrients={Nutrients} MealType_Weekday={MealType_Weekday} closeCustomMealModal={setisOpen}/>}
          
            </div>

            </>
        )
}