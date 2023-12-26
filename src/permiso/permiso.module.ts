import { Module } from '@nestjs/common';
import { PermisoController } from './permiso.controller';
import { PermisoService } from './permiso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permiso } from './permiso.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Permiso])],
  controllers: [PermisoController],
  providers: [PermisoService]
})
export class PermisoModule {}
