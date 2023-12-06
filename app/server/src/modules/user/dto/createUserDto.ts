import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {

       @ApiProperty()
       provider: string;

       @IsNotEmpty({ message: 'First Name is Required' })
       @ApiProperty()
       private readonly firstName: string;

       @IsNotEmpty({ message: 'Last Name is Required' })
       @IsNotEmpty()
       @ApiProperty()
       private readonly lastName: string;


       @IsEmail({}, { message: 'Please Provide a Valid Email Address' })
       @IsNotEmpty({ message: 'Email is Required' })
       @ApiProperty()
       readonly email: string;

       @ApiProperty()
       private readonly picture: string;

       
       @Length(8, 30, { message: 'Password Must be atleast 8 Characters' })
       @IsNotEmpty({ message: 'Password is Required' })
       @ApiProperty()
       password: string;

    

   
}
