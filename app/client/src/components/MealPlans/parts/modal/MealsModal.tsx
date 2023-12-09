import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { CustomMealModal } from './CustomMealsModal';

type NutrientsType = {
    name: string,
    value: number
}

const Nutrients: NutrientsType[] = [
    {name: 'Calories:', value: 0},
    {name: 'Carbohydrates:', value: 0},
    {name: 'Fat:', value: 0},
    {name: 'Protein:', value: 0}
]

export const MealsModal = ({ value, closeMealModal}: any) => {

    const [isOpen, setisOpen] = useState(false);

    const nutrientsData = Object.values(value.nutrients);


    Nutrients.forEach((nutrient: any, index) => {
        nutrient.value = nutrientsData[index];
    });

    
    return(

        <>   
                <div className="bg-gray-500 z-40 fixed top-0 left-0 w-full h-full opacity-80"></div>

            <div key={value.mealcontents.title} className="absolute m-auto z-50 bg-slate-700 px-5 py-16 rounded-md text-white w-1/2 h-2/4" 
                style={{ left: '-30%', right: '0', bottom: '0', top: '-50%' }}> 

                 
                <FontAwesomeIcon onClick={() => closeMealModal(false)} className="text-4xl hover:opacity-75 text-white cursor-pointer absolute right-2 top-2" icon={faTimes} />
             
                <h1 className="text-lg font-medium">Meal: {value.mealcontents.title} </h1>
                <h1 className="text-lg font-medium">Servings: {value.mealcontents.servings}</h1>
                <h1 className="text-lg font-medium">Ready In Minutes: {value.mealcontents.readyInMinutes}</h1>
        
                    {

                        Nutrients.map((data: NutrientsType) => (
                            <p className="text-lg font-medium" key={data.name}>{data.name} 
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
                         href={value.mealcontents.sourceUrl} 
                        >

                        {value.mealcontents.sourceUrl}

                        </a>

                    </h1>


                <button onClick={() =>  setisOpen(true)} className='absolute bottom-4 right-5 bg-slate-100 text-slate-800 font-bold p-2 rounded-md'>
                    Add this Meal to Custom Meal Plan
                </button>    

            </div>  


                { isOpen && <CustomMealModal closeMealModal={closeMealModal} closeCustomMealModal={setisOpen} value={value} />}

        </> 
    )
}