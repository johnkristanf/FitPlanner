import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {

       @IsNotEmpty({ message: 'Email is Required' })
       readonly email: string;
 
       @IsNotEmpty({ message: 'Password is Required' })
       password: string;
}
