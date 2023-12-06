import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomMealDto {

    @ApiProperty()
    readonly mealdata: {
        
        mealcontents:{
            readyInMinutes: number,
            servings: number,
            sourceUrl: string,
            title: string
            _id: string
        },

        nutrients: {
            calories: number,
            carbohydrates: number,
            fat: number,
            protein: number,
            _id: string
        }

    };

    @ApiProperty()
    readonly mealtype: string;

    @ApiProperty()
    readonly weekday: string;
}
