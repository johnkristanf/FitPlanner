import { ExtractJwt, Strategy } from 'passport-jwt'; 
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserType } from 'src/lib/types/User';
import { JwtPayload } from 'src/lib/types/JwtPayload';


    @Injectable()
    export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

        constructor(@InjectModel('User') private readonly UserModel: Model<UserType>){

            const extractJwtFromCookie = (req: any) => {

                let token = null;

                if(req && req.cookies) token = req.cookies['access_token'];
                
                return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
             
            }


            super({
                ignoreExpiration: false,
                secretOrKey: process.env.JWT_SECRET,
                jwtFromRequest: extractJwtFromCookie,
            });

        }



        async validate(payload: JwtPayload) {

            console.log('payload in jwt', payload)

            try {

                if(payload.google_id) return await this.getUserDetails('providerId', payload.google_id)


                if(payload.local_id) return await this.getUserDetails('_id', payload.local_id)

                
            } catch (error) {
                console.error(error);
                throw new HttpException('ERROR Validating Token',  HttpStatus.INTERNAL_SERVER_ERROR)
            }

          
        }


        async getUserDetails(queryField: string, payload_id: any) {

            const user: UserType = await this.UserModel.findOne({ [queryField]: payload_id });

            console.log('user sa validate jwt', user)
    
            if(!user) throw new HttpException('Please Login to Continue', HttpStatus.UNAUTHORIZED);
            
            return {
                id: user.providerId || user._id,
                fullname: `${user.firstName}, ${user.lastName}`,
                email: user.email,
                picture: user.picture

            };
        }
    }