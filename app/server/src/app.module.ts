import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ApiModule } from './modules/api/api.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomMealsModule } from './modules/custom_meals/custom_meals.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({

  imports: [
    ApiModule,
    AuthModule, 
    CustomMealsModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist')
    }),
    
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),   

    MongooseModule.forRoot(process.env.MONGO_DB_URI),

  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
