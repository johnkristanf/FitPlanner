import { CaloriesType } from "../../../lib/types/CalculatorData";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const caloriesTittleArray = [
    {name: 'Maintenance Calorie'},
    {name: 'Cutting/Calorie Deficit'},
    {name: 'Bulking/Calorie Surplus'}
]

export const DisplayCalories = ({ Calories }: any ) => {

    console.log('Calories', Calories)

    return(
        <>

        <div className="flex mt-5 font-bold max-md:mt-32">

            <div className="flex flex-col">

                {
                    caloriesTittleArray.map((data) => (

                            <div key={data.name} 

                               className=
                                {
                                  classNames('p-10 w-full bg-slate-700 rounded-l-md w-1/4 h-1/2 mt-20 text-white')
                                }
                                >
                            
                               {data.name}

                            </div>
                
                    ))
                }

            </div>


                <div className="flex flex-col">

                    {
                        Calories.map((data: CaloriesType) => (

                            <div key={data.key} 

                            className=
                                {
                                  classNames('p-10 w-full rounded-r-md bg-orange-700 w-1/4 h-1/2 mt-20 text-white')
                                }
                                >
                            
                                {data.calorieNumber} Calories/day

                            </div>
                
                        ))
                    }

                </div>       

        </div>   
        


        
        </>
    )
}