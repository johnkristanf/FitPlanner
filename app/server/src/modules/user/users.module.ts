import { Module } from '@nestjs/common';
import { UserService } from './users.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/User';

@Module({
  imports: [ MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]) ],
  providers: [UserService],
  exports: [UserService]
  
})
export class UsersModule {}
