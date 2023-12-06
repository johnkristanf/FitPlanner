import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){

    constructor(){
        super({
            clientID: '770093344597-trhjaj9s9ds12hnp4jkhv6s0eou6nhci.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:4000/auth/google/redirect',
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
