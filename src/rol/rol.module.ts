import { Module } from '@nestjs/common';
import { RolController } from './rol.controller';
import { RolService } from './rol.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { Permiso } from 'src/permiso/permiso.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Rol,Permiso])],
  controllers: [RolController],
  providers: [RolService]
})
export class RolModule {}
