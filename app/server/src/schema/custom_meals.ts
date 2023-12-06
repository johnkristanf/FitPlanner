import { Schema, model } from "mongoose";

export const CustomMealSchema = new Schema({

    mealdata: {

      mealcontents: [{
        id: Number,
        imageType: String,
        title: String,
        readyInMinutes: Number,
        servings: Number,
        sourceUrl: String,

      }],

      nutrients: [{
        calories: Number,
        carbohydrates: Number,
        fat: Number,
        protein: Number,
      }]

    },

    mealtype: [String],
    weekday: String,

    timeStamp: Date


});

export const CustomMealModel = model('custom-meals', CustomMealSchema)



