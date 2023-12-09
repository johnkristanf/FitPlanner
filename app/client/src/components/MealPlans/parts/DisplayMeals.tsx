import { MealsModal } from "./modal/MealsModal";

import { useState } from 'react';


export function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}


export const DisplayMeals = ({ Meals }: any) => {

    if(Meals.week){

        const [isOpen, setisOpen] = useState(false);

        const [MealsData, setMealsData] = useState('')

        const weeks = Object.entries(Meals.week);

        const openModal = (mealcontents: any, nutrients: any) => {

            const data: any = {
                mealcontents,
                nutrients
            }

            setMealsData(data)

            setisOpen(true);

        }

    
        return(
            
            <div className="flex max-md:flex-col gap-5 flex-wrap justify-center">

                {
                    
                    weeks.map(([key, value]: any) => (    

                        <div key={key} className="w-1/4 bg-gray-300 p-5 rounded-md mt-10">

                            <h1 className="text-orange-500 font-bold text-2xl">{key}</h1>

                                <div className="flex gap-3 mt-4">
                                   
                                    {
                                        value.meals.map((data: any, index: number) => (


                                            <button key={data.id} onClick={() => openModal(data, value.nutrients)} className=
                                            {
                                                
                                                classNames('bg-slate-700 p-2 text-white rounded-md hover:opacity-75')
                                            }
                                            >

                                            {
                                                `Meal ${index + 1}`
                                            }
                                        
                                           </button>

                                        ))

                                    }

                                </div>
                           
                            
                                      
                        </div>
           
                    ))
                }

                        { isOpen && <MealsModal closeMealModal={setisOpen} value={MealsData} />}
            </div>
        )



    }


  return (

    <div className="flex max-md:flex-col gap-10 flex-wrap justify-center">

        {
    
            Meals.meals.map((data: any) => (

                <div key={data.id} className="w-1/4 bg-gray-300 p-5 rounded-md mt-10">

                   <h1 className="text-lg font-medium">Meal: {data.title} </h1>
                   <h1 className="text-lg font-medium">Servings: {data.servings}</h1>
                   <h1 className="text-lg font-medium">Ready In Minutes: {data.readyInMinutes}</h1>

                    <h1 className="text-lg font-medium border-t-2 mt-5 mb-2 pt-2 border-black w-full">Steps and Ingredients:
                        <a
                        target="_blank"
                        className="text-ellipsis block max-w-full text-justify text-orange-500 overflow-hidden whitespace-nowrap mt-1"
                        href={data.sourceUrl} 
                        >

                        {data.sourceUrl}

                        </a>

                    </h1>

                </div>

            ))
    
        }


    </div>

  );

}
