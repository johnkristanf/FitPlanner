import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { removeMeal } from '../../../../services/CustomMeal/removeMeal';
import { mealDataTobeDeletedTypes } from '../../../../lib/types/MealPlans';


type NutrientsType = {
    name: string,
    value: number
}

const NutrientsArray: NutrientsType[] = [
    {name: 'Calories:', value: 0},
    {name: 'Carbohydrates:', value: 0},
    {name: 'Fat:', value: 0},
    {name: 'Protein:', value: 0}
]


export const CustomMealsDataModal = ({ Mealcontents, Nutrients, MealType_Weekday, closeCustomMealModal}: any) => {


    NutrientsArray[0].value = Nutrients.calories;
    NutrientsArray[1].value = Nutrients.carbohydrates;
    NutrientsArray[2].value = Nutrients.fat;
    NutrientsArray[3].value = Nutrients.protein;


    const RemoveMeal = async () => {

        const mealDataTobeDeleted: mealDataTobeDeletedTypes = {
            Mealcontents_id: Mealcontents._id,
            Nutrients_id: Nutrients._id,
            MealType_Weekday: MealType_Weekday
        }

        const response = await removeMeal(mealDataTobeDeleted);

        console.log('response from remove', response);


        if(response){

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Meal deleted Successfully!',
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(() => {
                closeCustomMealModal(false)
            }, 1500)
        }


    }


    return(

        <>   
                <div className="bg-gray-500 z-40 fixed top-0 left-0 w-full h-full opacity-80"></div>

        <div className='h-full w-full'>

            <div className="absolute z-50 bg-slate-700 px-5 py-16 rounded-md text-white w-1/2 h-5/6 
                            max-md:w-full max-md:h-3/5" 
                 style={{ left: '23%', right: '0', bottom: '0', top: '-10%' }}> 

                
                <FontAwesomeIcon onClick={() => closeCustomMealModal(false)} className="text-4xl hover:opacity-75 text-white cursor-pointer absolute right-2 top-2" icon={faTimes} />
             
                <h1 className="text-lg font-medium">Meal: {Mealcontents.title} </h1>
                <h1 className="text-lg font-medium">Servings: {Mealcontents.servings}</h1>
                <h1 className="text-lg font-medium">Ready In Minutes: {Mealcontents.readyInMinutes}</h1>
        
                    {

                        NutrientsArray.map((data: NutrientsType) => (

                            <p className="text-lg font-medium" key={data.name}> {data.name} 
                                {
                                   data.value
                                } 
                            </p>

                        ))

                    }

               

                    <h1 className="text-lg font-medium border-t-2 mt-5 mb-2 pt-2 border-white  w-full">Steps and Ingredients:
                        <a
                         target="_blank"
                         className="text-ellipsis block max-w-full text-justify text-orange-500 overflow-hidden whitespace-nowrap mt-1"
                         href={Mealcontents.sourceUrl} 
                        >

                        {Mealcontents.sourceUrl}

                        </a>

                    </h1>

                    <div className='w-full flex justify-end pr-3 pt-4'>
                       <button 
                           onClick={ async () => await RemoveMeal() }
                           className='bg-red-800 p-2 rounded-md font-semibold hover:opacity-75'>
                            Remove Meal
                        </button>

                    </div>
                    
            </div> 

        </div> 


        </> 
    )
}