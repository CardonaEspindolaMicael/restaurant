import { Module } from '@nestjs/common';
import { RolController } from './rol.controller';
import { RolService } from './rol.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { Permiso } from 'src/permiso/permiso.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports:[TypeOrmModule.forFeature([Rol,Permiso])],
  controllers: [RolController],
  providers: [RolService,{
    provide:APP_GUARD,
    useClass:AuthGuard
  }]
})
export class RolModule {}
