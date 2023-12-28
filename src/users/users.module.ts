import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports:[TypeOrmModule.forFeature([User])],  //We add this to know what user this module will use
  controllers: [UsersController],
  providers: [UsersService,{
    provide:APP_GUARD,
    useClass:AuthGuard
  }]
})
export class UsersModule {}
