import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { ExercisesType } from '../../../lib/types/Exercises';
import { fetchExercisesbyAttributes, fetchAllExercises } from '../../../services/fetchExercises';

import { DisplayExercises } from './DisplayExercise';

const Muscle = [
  { name: 'N/A', value: '' },
  { name: 'Abdominals', value: 'abdominals' },
  { name: 'Abductors', value: 'abductors' },
  { name: 'Biceps', value: 'biceps' },
  { name: 'Calves', value: 'calves' },
  { name: 'Chest', value: 'chest' },
  { name: 'Forearms', value: 'forearms' },
  { name: 'Glutes', value: 'glutes' },
  { name: 'Hamstrings', value: 'hamstrings' },
  { name: 'Lats', value: 'lats' },
  { name: 'Lower Back', value: 'lower_back' },
  { name: 'Middle Back', value: 'middle_back' },
  { name: 'Neck', value: 'neck' },
  { name: 'Quadriceps', value: 'quadriceps' },
  { name: 'Traps', value: 'traps' },
  { name: 'Triceps', value: 'triceps' },
 
];

const Types = [
  { name: 'N/A ', value: '' },
  { name: 'Cardio ', value: 'cardio' },
  { name: 'Olympic Weightlifting ', value: 'olympic_weightlifting' },
  { name: 'Plyometrics ', value: 'plyometrics' },
  { name: 'Powerlifting ', value: 'powerlifting' },
  { name: 'Strength ', value: 'strength' },
  { name: 'Stretching', value: 'stretching' },
  { name: 'Strongman', value: 'strongman' },
 
];

const Difficulties = [
  { name: 'Beginner', value: 'beginner' },
  { name: 'Intermediate', value: 'intermediate' },
  { name: 'Expert', value: 'expert' },
 
];


export const FinderForm = () => {

  const [Exercises, setExercises]: any = useState('');
    
  const [selectedMuscle, setSelectedMuscle] = useState(Muscle[0].value);

  const [selectedType, setSelectedType] = useState(Types[0].value);

  const [selectedDifficulty, setSelectedDifficulty] = useState(Difficulties[0].value);

  const [FormPopUp, setFormPopUp] = useState(false);


  useEffect(()  => {

    const fetchData = async () => {

      try {
        const data = await fetchAllExercises();

        if (data) setExercises(data);
        
      } catch (error) {
        
        console.error('Error fetching data:', error);
      }

    }

      fetchData();
   
  } , []);



  const handleMuscleChange = (event: any) => {
    setSelectedMuscle(event.target.value);
  };

  const handleTypeChange = (event: any) => {
    setSelectedType(event.target.value);
  };

  const handleDifficultyChange = (event: any) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const exerciseData: ExercisesType = {
      muscle: selectedMuscle,
      type: selectedType,
      difficulty: selectedDifficulty

    }

    const response = await fetchExercisesbyAttributes(exerciseData)
   
    setExercises(response);

    setFormPopUp(false);

  };


  return (

  <>

    <div className=

        {

          FormPopUp
            ? 'max-md:block max-md:w-full max-md:top-0 max-md:justify-start max-md:py-0 max-md:z-50 flex absolute left-0 min-h-full flex-col justify-center px-6 py-24 lg:px-8 bg-orange-500'
                    
            : 'flex absolute left-0 min-h-full  flex-col justify-center px-6 py-24 lg:px-8 bg-orange-500 max-md:hidden'
        } >

          <FontAwesomeIcon 
              className="text-5xl hover:opacity-75 text-white cursor-pointer absolute right-4 top-2"
              icon={faTimes} 
              onClick={() => setFormPopUp(false)}
          />

      <div className="sm:mx-auto sm:w-full sm:max-w-sm pt-10 ">

        <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-white">
          Find an Exercise
        </h2>

      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        <form className="space-y-6" onSubmit={handleSubmit}>

          <div className="pb-5">
            <label className="block text-sm font-medium leading-6 text-white">
              Muscle
            </label>

            <div className="mt-2">
              <select
                value={selectedMuscle}
                onChange={handleMuscleChange}
                className="focus:outline-none w-full p-2 rounded-md"
              >
                {Muscle.map((muscle) => (

                  <option key={muscle.value} value={muscle.value} >
                    {muscle.name}
                  </option>

                ))}

              </select>

            </div>
          </div>

          <div className="pb-5">

            <label className="block text-sm font-medium leading-6 text-white">
              Type
            </label>

            <div className="mt-2">

              <select
                value={selectedType}
                onChange={handleTypeChange}
                className="focus:outline-none w-full p-2 rounded-md"
              >
                {Types.map((type) => (

                  <option key={type.value} value={type.value}>
                    {type.name}

                  </option>
                  
                ))}

              </select>
            </div>
          </div>

          <div className="pb-2">

            <label className="block text-sm font-medium leading-6 text-white">
              Difficulty
            </label>

            <div className="mt-2">

              <select
                value={selectedDifficulty}
                onChange={handleDifficultyChange}
                className="focus:outline-none w-full p-2 rounded-md"
              >
                {Difficulties.map((difficulty) => (

                  <option key={difficulty.value} value={difficulty.value}>
                    {difficulty.name}
                  </option>

                ))}

              </select>

            </div>

          </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Find
                  </button>
                </div>

        </form>

      </div>

          

    </div>


            <div className='flex justify-center flex-wrap w-4/5 absolute right-5 top-40 p-10 gap-16'>

                  <div className='absolute top-0 left-20 max-md:left-0 z-10'>

                      <h1 className='text-slate-800 text-2xl font-bold'>Find a Exercise</h1>
                      <h3 className='text-slate-800 text-1xl opacity-95 font-bold'>Improve your Form and Discover new Exercise</h3>

                        <div className="max-md:block hidden">

                          <button 
                            onClick={() => setFormPopUp(true)}
                            className='mt-5 bg-orange-500 rounded-md p-2 text-white hover:opacity-75'>
              
                            Find an Exercise
                          </button>

                        </div>
                       
                          
                  </div>

                  

                
              { 
                  Exercises && Exercises.length === 0 ?

                    <div className='flex flex-col mt-10'>
                        <h1 className='text-4xl font-bold text-orange-500 my-3'>No Results Found</h1> 
                          <p className='text-1xl font-bold text-orange-500'>
                              Make Sure to Combine Proper Muscle and Type
                          </p>

                    </div>
                    
                  : Exercises && ( <DisplayExercises Exercises={Exercises} /> ) 
              }

              


            </div>

  </>

    );

}



export default FinderForm;
