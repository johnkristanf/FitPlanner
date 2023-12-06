import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';

import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [

    CacheModule.register({ 
    ttl: 5, 
    max: 10,
    }),

  ],
  
  controllers: [ApiController],

  providers: [ApiService],
})
export class ApiModule {}
