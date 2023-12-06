import { useState } from 'react';

import { MealPlansType, MealPlansApiResponseType } from '../../../lib/types/MealPlans';
import { fetchMealPlans } from '../../../services/fetchMealPlans';

import { DisplayMeals } from './DisplayMeals';
import { DisplayCustomMeals } from './DisplayCustomMeals';

const timeFrameOptions = [
    {name: '1 day', value: 'day'},
    {name: '1 week', value: 'week'}

]

const diet = [
    {name: 'N/A', value: ''},
    {name: 'Gluten Free', value: 'glutenfree'},
    {name: 'Ketogenic', value: 'ketogenic'},
    {name: 'Vegetarian', value: 'vegetarian'},
    {name: 'Lacto-Vegetarian', value: 'lacto-vegetarian'},
    {name: 'Ovo-Vegetarian', value: 'ovo-vegetarian'},
    {name: 'Vegan', value: 'vegan'},
    {name: 'Pescetarian', value: 'pescetarian'},
    {name: 'Paleo', value: 'paleo'},
    {name: 'Primal', value: 'primal'},
    {name: 'Low FODMAP', value: 'lowfodmap'},
    {name: 'Whole30', value: 'whole30'},

]


export const MealPlanForm = () => {

    const [ViewCustomMeals, setViewCustomMeals] = useState(false);

    const [Meals, setMeals] = useState<MealPlansApiResponseType | null>(null); 

    const [SelectedTimeFrame, setSelectedTimeFrame] = useState(timeFrameOptions[0].value);
    const [SelectedDiet, setSelectedDiet] = useState(diet[0].value);
    const [TargetCalories, setTargetCalories] = useState('');
    const [Excluded, setExcluded] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            const mealPlanData: MealPlansType = {
                timeframe: SelectedTimeFrame,
                diet: SelectedDiet,
                targetCalories: parseInt(TargetCalories),
                excluded: Excluded,
            }

            const response = await fetchMealPlans(mealPlanData);

            if(response) setMeals(response);
            
        } catch (error) {
            console.error(error);
            throw error;
        }

    }

    return(

    <>

    <div className="flex absolute left-0 min-h-full w-1/4 flex-1 flex-col justify-center px-6 py-24 bg-orange-500 z-10 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm pt-10">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Generate Meal Plan
        </h2>

      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        <form className="space-y-6" onSubmit={handleSubmit}>

          <div className="pb-5">
            <label className="block text-sm font-medium leading-6 text-white">
              Time Frame
            </label>

            <div className="mt-2">

              <select
                value={SelectedTimeFrame}
                onChange={(e) => setSelectedTimeFrame(e.target.value)}

                className="focus:outline-none w-full p-2 rounded-md"
              >
                {timeFrameOptions.map((time) => (

                  <option key={time.value} value={time.value} >
                    {time.name}
                  </option>

                ))}

              </select>

            </div>
          </div>

          <div className="pb-5">

            <label className="block text-sm font-medium leading-6 text-white">
              Target Calories
            </label>

            <div className="mt-2">
                <input type="number" value={TargetCalories} 
                onChange={(e) => setTargetCalories(e.target.value)} 
                className='w-full rounded-md p-2 focus:outline-none p-2 rounded-md' placeholder='eg. 2000'/>
            </div>

          </div>

          <div className="pb-2">

            <label className="block text-sm font-medium leading-6 text-white">
              Diet
            </label>

            <div className="mt-2">

              <select
                value={SelectedDiet}
                onChange={(e) => setSelectedDiet(e.target.value)}
                className="focus:outline-none w-full p-2 rounded-md"
              >
                {diet.map((item) => (

                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>

                ))}

              </select>

            </div>

          </div>


           <div className="pb-2">

            <label className="block text-sm font-medium leading-6 text-white mb-3">
              Exclude Ingredients (optional) <p className='text-xs tracking-wider mt-2'>A comma-separated list of allergens or ingredients that must be excluded.</p>
            </label>

            <div className="mt-4">
                <input type="text"
                  className='w-full rounded-md focus:outline-none p-2 rounded-md' 
                  placeholder='eg. garlic,egg,yogurt' 
                  value={Excluded}
                  onChange={(e) => setExcluded(e.target.value)}/>
            </div>

            

          </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Generate
                  </button>
                </div>

        </form>

      </div>

          

    </div>


            <div className='flex justify-start flex-wrap w-4/5 absolute top-40 pl-3 gap-16' style={{right: '-5%'}}>

                {
                
                  ViewCustomMeals && 
                    <> 
                        <div className='fixed top-0 bottom-0 right-0 left-0 z-40 m-auto bg-gray-800 opacity-90' style={{ zIndex: '500' }}></div> 
                          <DisplayCustomMeals closeModal={setViewCustomMeals}/> 
                    </> 
                } 

                { 
                    !Meals ?

                      <>
                        <div className='flex flex-col ml-10 mt-3'>

                              <h1 className='text-3xl font-bold text-slate-800 mb-3'>Generate Meal Plan</h1> 
                                <p className='font-bold text-slate-800 opacity-75 text-1xl'>Keep tabs on your calorie consumption, macronutrient
                                  distribution, and meal adherence 
                                </p>

                        </div>

                          <button onClick={() => setViewCustomMeals(true)} className='bg-orange-500 h-1/2 text-white p-2 rounded-md hover:opacity-75'>
                            View Custom Meals
                          </button>

                        
                      </>

                    : <div className='flex flex-col w-11/12'>

                        <div className='flex gap-28'>

                              <div className='flex flex-col mt-5 ml-5'>
                                  <h1 className='text-3xl font-bold text-slate-800 mb-3'>Generate Meal Plan</h1> 
                                    <p className='font-bold text-slate-800 opacity-75 text-1xl'>Keep tabs on your calorie consumption, macronutrient
                                      distribution, and meal adherence 
                                    </p>

                                </div>

                            <button onClick={() => setViewCustomMeals(true)} className='bg-orange-500 h-1/2 w-1/6 mt-5 self-end text-white p-2 rounded-md hover:opacity-75'>
                                View Custom Meals
                            </button>

                        </div>

                            { Meals && <DisplayMeals Meals={Meals} /> }

                      </div>
                    
                }


            </div>

    </>

    )
}