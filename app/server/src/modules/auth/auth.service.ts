import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserType } from 'src/lib/types/User';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/users.service';
import { Model } from 'mongoose';

import { CreateUserDto } from '../user/dto/createUserDto';
import { LoginUserDto } from '../user/dto/loginUserDto';

import { JwtPayload } from 'src/lib/types/JwtPayload';


@Injectable()
export class AuthService {

    constructor(
        @InjectModel('User') private UserModel: Model<UserType>,
        private userService: UserService,
        private jwtService: JwtService ){}


    generateJwt(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }
    


    async SignIn(user: UserType){


        if (!user) throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED);
        

        const userExists = await this.findUserByEmail(user.email);

        if (!userExists) {
          return this.registerUser(user);
        }

        console.log('userExists', userExists)


        return this.generateJwt({
            google_id: userExists.providerId,
            email: userExists.email,
        });

    }


    async registerUser(user: UserType){

        try {

            const newUser = new this.UserModel(user);

            await newUser.save();

            console.log('newUser', newUser)


            return this.generateJwt({
                google_id: newUser.providerId,
                email: newUser.email,
            });
            

        } catch (error) {
            console.error(error);
            throw new HttpException('Error Registering Google User', HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async findUserByEmail(email:string) {

        const user = await this.UserModel.findOne({ email });
    
        if (!user) return null;
    
        return user;
    }


    async Signup(user: CreateUserDto) {
        return await this.userService.Signup(user)
    }


    async Login(user: LoginUserDto) {
        
        const loginSuccess = await this.userService.Login(user);

        console.log('loginSuccess local user data', loginSuccess)

        if(!loginSuccess) throw new HttpException('Incorrect Username or Password', HttpStatus.UNAUTHORIZED);

        return this.generateJwt({
            local_id: loginSuccess._id,
            email: loginSuccess.email,
        });;
    }
}

