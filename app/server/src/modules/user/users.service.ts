import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from './dto/createUserDto';
import { LoginUserDto } from './dto/loginUserDto';

import { UserType, loginCredentials } from 'src/lib/types/User';
import { Model } from 'mongoose';


import { hash, compare } from 'bcrypt'


@Injectable()
export class UserService {

    constructor(@InjectModel('User') private UserModel: Model<UserType>) {}

    async Signup(user: CreateUserDto) {

        try {

            user.provider = 'local'
            user.password = await hash(user.password, 10);

            const signup = new this.UserModel(user);
            return await signup.save();
            
        } catch (error) {
            console.error(error);
            throw new HttpException('Error Signing Up User', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async Login(user: LoginUserDto): Promise<loginCredentials> {

        try {

           const userExists = await this.findUser(user.email);

           if(!userExists) throw new HttpException('User does not Exist', HttpStatus.NOT_FOUND);


           const validPassword = await this.isValidPassword(user.password, userExists?.password);

           if(!validPassword) throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);


           return userExists;
            
        } catch (error) {
            console.error(error);
        }
    }


    async findUser(email: string){

        try {
            return await this.UserModel.findOne({ email: email }).select('email firstName lastName password');
            
        } catch (error) {
            console.error(error);
        }
    
    }


    async isValidPassword(password: string, hashedPassword: string): Promise<boolean> {

        try {
            if(password && hashedPassword) return await compare(password, hashedPassword)
            
        } catch (error) {
            console.error(error);
        }
    }

}
