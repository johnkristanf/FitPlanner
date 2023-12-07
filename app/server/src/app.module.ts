import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ApiModule } from './modules/api/api.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomMealsModule } from './modules/custom_meals/custom_meals.module';



@Module({

  imports: [
    ApiModule,
    AuthModule, 
    CustomMealsModule,
    
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),   

    MongooseModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DB_URI'),
      }),

      inject: [ConfigService],

    }),

  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
