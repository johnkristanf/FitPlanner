import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { addCustomMeal } from "../../../../services/CustomMeal/addMeal";

import Swal from 'sweetalert2';

const mealType = [
    {name: 'BreakFast', value: 'breakfast'},
    {name: 'Lunch', value: 'lunch'},
    {name: 'Dinner', value: 'dinner'}
]


const weekDays = [
    {name: 'Monday', value: 'Monday'},
    {name: 'Tuesday', value: 'Tuesday'},
    {name: 'Wednesday', value: 'Wednesday'},
    {name: 'Thursday', value: 'Thursday'},
    {name: 'Friday', value: 'Friday'},
    {name: 'Saturday', value: 'Saturday'},
    {name: 'Sunday', value: 'Sunday'},
]

export const CustomMealModal = ({ closeMealModal, closeCustomMealModal, value }: any) => {

    const [FormData, setFormData] = useState({
        mealtype: mealType[0].value,
        weekday: weekDays[0].value,
        mealdata: value,
        timeStamp: new Date()
    })


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        try {

            const response = await addCustomMeal(FormData);

              if(response){
  
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Meal Added Successfully!",
                  showConfirmButton: false,
                  timer: 1500
                }); 
  
                setTimeout(() => {
                    closeCustomMealModal(false)
                    closeMealModal(false)
  
                }, 1500)
      
              }
            
          
        } catch (error: any) {
          console.error(error);

          if(error.response) {

              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500
              });
          }

        }
           
    }


    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
      
        setFormData({
          ...FormData,
          [name]: value,

        });
    };


    return(
        <>
        
    <div className="flex z-50 w-2/3 absolute left-5 rounded-md h-2/3 flex-1 flex-col justify-center bg-slate-700" style={{top: '-6%'}}>

            <FontAwesomeIcon onClick={() => closeMealModal(false)} 
               className="text-4xl hover:opacity-75 text-white cursor-pointer absolute right-2 top-2" 
               icon={faTimes}
            />

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Custom Meal Plan
        </h2>

      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        <form className="space-y-6" onSubmit={handleSubmit}>

          <div className="pb-5">
            <label className="block text-sm font-medium leading-6 text-white">
              Week Day
            </label>

            <div className="mt-2">

                <select 
                   name="weekday"
                   onChange={handleSelectChange}  
                   className="focus:outline-none w-full p-2 rounded-md">

                    {
                        weekDays.map((data) => (
                            <option key={data.value} value={data.value}>
                               {data.name}
                            </option>
                        ))
                    }
                
                </select>

            </div>
          </div>

          <div className="pb-2">

            <label className="block text-sm font-medium leading-6 text-white">
              Meal Type
            </label>

            <div className="mt-2">

              <select
                name='mealtype'
                onChange={handleSelectChange}
                className="focus:outline-none w-full p-2 rounded-md"
              >
                {
                
                    mealType.map((data) => (

                      <option key={data.value} value={data.value}>
                        {data.name}
                      </option>

                    ))
                }

              </select>

            </div>

          </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Meal
                  </button>
                </div>

        </form>

      </div>


    </div>

        </>
    )
}