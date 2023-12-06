
import { Schema, model } from "mongoose";

export const UserSchema = new Schema({
    provider: String,
    providerId: String,
    email: String,
    firstName: String,
    lastName: String,
    picture: String,
    password: String

});

export const UserModel = model('User', UserSchema)



