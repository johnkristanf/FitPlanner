import { useState } from "react";
import { sortExercises } from "../../../lib/helpers/sortExercises";
import React from "react";

const InstructionsModal = React.lazy(() => import('./modal/InstructionsModal'));


export const DisplayExercises = ({ Exercises }: any) => {

    const sortedExercises = sortExercises(Exercises);
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState<any>(null);

    const openModal = (exercise: any) => {
        setSelectedExercise(exercise);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };


    return (

        <>   
            {sortedExercises.map((data: any) => (
              
                <div key={data.name} className="w-1/4 bg-gray-300 p-5 rounded-md mt-10">

                    <h1 className="text-lg font-medium">Name: {data.name} </h1>
                    <h1 className="text-lg font-medium">Type: {data.type}</h1>
                    <h1 className="text-lg font-medium">Muscle: {data.muscle}</h1>
                    <h1 className="text-lg font-medium">Equipment: {data.equipment}</h1>

                    <h1 className="text-lg border-b-2 border-slate-950 pb-3 mb-3 font-medium">
                        Difficulty: {data.difficulty}
                    </h1>
                    
                    <button onClick={() => openModal(data)} className="bg-orange-500 w-full mt-3 rounded-md p-2 text-white font-semibold">Instructions</button>
                </div>

            ))}

            {isOpen && <InstructionsModal exercise={selectedExercise} closeModal={closeModal} />}

        </> 
    );
};


