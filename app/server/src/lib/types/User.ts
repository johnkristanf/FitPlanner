import { Types } from 'mongoose';

export interface GoogleUserType {
    provider: string,
    providerId: string,
    email: string,
    firstName: string,
    lastName: string,
    picture: string,
    password: string
}

export interface LocalUserType{
    _id: String | Types.ObjectId, 
    email: string,
    firstName: string,
    lastName: string,
    password: string
}


export interface UserType extends GoogleUserType, LocalUserType{}



export type loginCredentials = {
    _id: String | Types.ObjectId, 
    email: string,
    firstName: string,
    lastName: string
}