import { Module } from '@nestjs/common';
import { MesaService } from './mesa.service';
import { MesaController } from './mesa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mesa } from './entities/mesa.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports:[TypeOrmModule.forFeature([Mesa])],
  controllers: [MesaController],
  providers: [MesaService],
})
export class MesaModule {}
