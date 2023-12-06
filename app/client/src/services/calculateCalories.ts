import { CalculatorDataType, CaloriesType } from "../lib/types/CalculatorData";



export const CalculateCalories = (data: CalculatorDataType) => {

    const calories: CaloriesType[] = [
        { key: crypto.randomUUID(), calorieNumber: 0},
        { key: crypto.randomUUID(), calorieNumber: 0},
        { key: crypto.randomUUID(), calorieNumber: 0}
    ]

    if(data.gender === 'male'){

        const BMR: number = 88.362 + (13.397 * parseFloat(data.weight)) + (4.799 * parseFloat(data.height)) - ( 5.677 * parseFloat(data.age));
        

        calories[0].calorieNumber = (Math.floor(maintenanceCalories(data.activity, BMR)));

        calories[1].calorieNumber = (Math.floor(maintenanceCalories(data.activity, BMR)) - 500);
        calories[2].calorieNumber = (Math.floor(maintenanceCalories(data.activity, BMR)) + 250);

        return calories;

    }


    if(data.gender === 'female'){

        const BMR: number = 447.593 + (9.247 * parseFloat(data.weight)) + (3.098 * parseFloat(data.height)) - (4.330 * parseFloat(data.age));

        calories[0].calorieNumber = Math.floor(maintenanceCalories(data.activity, BMR));

        calories[1].calorieNumber = Math.floor(maintenanceCalories(data.activity, BMR)) - 500;
        calories[2].calorieNumber = Math.floor(maintenanceCalories(data.activity, BMR)) + 250 ;

        return calories;
    }
        
}

const maintenanceCalories = (activity: string, BMR: number) => {

    let maintenanceCalorie: number;

    switch (activity) {
        case 'sedentary':
          maintenanceCalorie = BMR * 1.2
          break;

        case 'lightActive':
          maintenanceCalorie = BMR * 1.375
          break;
          
        case 'moderateActive':
          maintenanceCalorie = BMR * 1.55
          break; 
          
        case 'veryActive':
          maintenanceCalorie = BMR * 1.725
          break; 

        case 'superActive':
          maintenanceCalorie = BMR * 1.9
          break; 

        default:
            maintenanceCalorie = 0
    }

    return maintenanceCalorie;

}


