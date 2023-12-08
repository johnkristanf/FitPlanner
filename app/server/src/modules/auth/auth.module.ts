import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../user/users.module';


import { GoogleStrategy } from 'src/config/google.strategy';
import { JwtStrategy } from 'src/config/jwt.strategy';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UserSchema } from 'src/schema/User';

@Module({

  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
    UsersModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],

      useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_SECRET,  
        signOptions: { expiresIn: '7d' },
      }),

      inject: [ConfigService]

    })
    
  ],
  
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy],

})

export class AuthModule {}
