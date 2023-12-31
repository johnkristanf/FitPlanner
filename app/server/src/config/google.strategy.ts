import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){

    constructor(){
        super({
            clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
            callbackURL:process.env.GOOGLE_AUTH_REDIRECT_URI,
            scope: ['email', 'profile'],
        })
    }


    async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        
        const { id, name, emails, photos } = profile;

        const user = {
          provider: 'google',
          providerId: id,
          email: emails[0].value,
          firstName: name.givenName,
          lastName: name.familyName,
          picture: photos[0].value,

        }

        done(null, user);

    }
}
