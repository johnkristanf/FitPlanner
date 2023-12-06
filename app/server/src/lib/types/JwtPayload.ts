import { Types } from 'mongoose';

export interface GoogleJwtPayload {
    google_id?: String | Types.ObjectId,
    email: String
};

export interface LocalJwtPayload {
    local_id?: String | Types.ObjectId,
    email: String
};


export interface JwtPayload extends GoogleJwtPayload, LocalJwtPayload{}