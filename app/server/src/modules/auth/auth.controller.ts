import { Get, UseGuards, Req, Res, Post, Body } from '@nestjs/common/decorators';
import { Response } from 'express';

import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { GoogleOauthGuard } from 'src/guard/google.guard';

import { CreateUserDto } from '../user/dto/createUserDto';
import { LoginUserDto } from '../user/dto/loginUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleLogin(): Promise<void> {}

  

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)

  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {

    const isProduction = process.env.NODE_ENV === 'production';

    const token = await this.authService.SignIn(req.user);

    if(!token) throw new HttpException('Error Generating Token', HttpStatus.INTERNAL_SERVER_ERROR)

      res.cookie('access_token', token, {
        maxAge: 604800000,
        secure: true,
        httpOnly: true,
        path: '/'
      });


      res.redirect('https://fitplanner.vercel.app/meal-plans');
  }

  
  @Post('signup')
  async Signup(@Body() user: CreateUserDto) {
    return await this.authService.Signup(user);
    
  }


  @Post('login')  
  async Login(@Body() user: LoginUserDto, @Res() res: Response) {

    const isProduction = process.env.NODE_ENV === 'production';

    const token = await this.authService.Login(user);

    console.log('token in local user', token)

    res.cookie('access_token', token, {
      maxAge: 604800000,
      secure: true,
      httpOnly: true,
      path: '/'

    });


    res.status(200).send(true);


  }


  @Get('user/profile')
  @UseGuards(JwtAuthGuard)

  UserProfile(@Req() req: any) {
    return req.user
    
  }



}
