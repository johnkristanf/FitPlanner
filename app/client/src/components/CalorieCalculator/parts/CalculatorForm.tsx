import { useState } from 'react';
import { CalculateCalories } from '../../../services/calculateCalories';

import { DisplayCalories } from './DisplayCalories';

const genderArray = [
    { name: 'male', text: 'Male'},
    { name: 'female', text: 'Female'}
];

const activityArray = [
    {name: 'Sedentary (little to no exercise)', value: 'sedentary'},
    {name: 'Lightly active (light exercise or sports 1-3 days a week)', value: 'lightActive'},
    {name: 'Moderately active (moderate exercise or sports 3-5 days a week)', value: 'moderateActive'},
    {name: 'Very active (hard exercise or sports 6-7 days a week)', value: 'veryActive'},
    {name: 'Super active (very hard exercise, physical job, or training twice a day)', value: 'superActive'},
]

export const CalculatorForm = () => {

    const [Calories , setCalories]: any = useState('');

    console.log('Calories', Calories)

    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        height: '',
        weight: '',
        activity: activityArray[0].value,
    });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setCalories(CalculateCalories(formData))

        console.log('formData', formData)
    }
    
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
          ...formData,
          [name]: value,

        });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
      
        setFormData({
          ...formData,
          [name]: value,

        });
    };

    
      
    

    return(
        <>

           <div className="flex w-1/4 absolute left-0 min-h-full flex-1 flex-col justify-center px-6 py-24 lg:px-8 bg-orange-500">

        <div className="sm:mx-auto sm:w-full sm:max-w-sm pt-10">
           <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Calorie Calculator
           </h2>
        </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        <form className="space-y-6" onSubmit={handleSubmit}>

            <div className="pb-5">

              <label className="block text-sm font-medium leading-6 text-white">
                Age
              </label>

              <div className="mt-2">
                 <input type="number" name='age' 
                    value={formData.age} 
                    onChange={handleInputChange} 
                    className='w-full rounded-md p-2 focus:outline-none p-2 rounded-md'
                 />
                 
              </div>

            </div>


            <div className="pb-5">

              <label className="block text-sm font-medium leading-6 text-white">
                Gender
              </label>

              <div className="mt-2">
                  {
                        genderArray.map((data) => (
                        
                            <div className='flex gap-3 items-center' key={data.name}>

                                <input type="checkbox" 
                                    name='gender' 
                                    value={data.name} 
                                    onChange={handleInputChange}
                                />

                                <p className='text-white text-lg'>{data.text}</p>
                                

                            </div>
                        ))
                  }

              </div>
            </div>

            <div className="pb-2">

              <label className="block text-sm font-medium leading-6 text-white">
                Height
              </label>

              <div className="mt-2">
                  <input type="number" 
                    name="height" 
                    value={formData.height} 
                    placeholder='Height in Cm' 
                    onChange={handleInputChange}
                    className='w-full rounded-md p-2 focus:outline-none p-2 rounded-md'
                    />
              </div>

            </div>


          
            <div className="pb-2">

                <label className="block text-sm font-medium leading-6 text-white">
                  Weight
                </label>

                <div className="mt-2">
                    <input type="number" 
                      name="weight" 
                      value={formData.weight} 
                      onChange={handleInputChange} 
                      placeholder='Weight in Kg'
                      className='w-full rounded-md p-2 focus:outline-none p-2 rounded-md'
                      />

                </div>

            </div>


            <div className="pb-2">

                <label className="block text-sm font-medium leading-6 text-white">
                  Activity
                </label>

                <div className="mt-2">

                    <select value={formData.activity} onChange={handleSelectChange} name='activity' className="focus:outline-none w-full p-2 rounded-md">
                        {
                            activityArray.map((data) => (
                                <option key={data.value} value={data.value} >{data.name}</option>
                            ))
                        }
                    </select>

                </div>

            </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Calculate
                  </button>
                </div>

        </form>

      </div>

    </div>

                <div className='flex justify-center flex-wrap w-4/5 absolute right-5 top-40 p-10 gap-16'>

                    <div className='absolute top-2 left-28'>
                        <h1 className='text-slate-800 font-bold text-3xl'>Calorie Calculator</h1>
                        <p className='text-slate-800 font-bold opacity-75'>The Calorie Calculator can
                           be used to estimate the number of calories a person needs to consume each day. This calculator can also provide some simple guidelines for gaining or losing weight.
                        </p>

                    </div>
                
                { 
                  Calories === undefined ?

                    <div className='flex flex-col mt-36'>
                        <h1 className='text-4xl font-bold text-orange-500 my-3'>Invalid Inputs</h1> 
                            <p className='text-1xl font-bold text-orange-500'>
                                Can't calculate calories make sure to put accurate data input
                            </p>

                    </div>
                    
                  : Calories && ( <DisplayCalories Calories={Calories} /> ) 
                }

              


            </div>
        </>
    )

}