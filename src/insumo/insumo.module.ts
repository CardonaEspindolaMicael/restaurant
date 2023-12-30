import { Module } from '@nestjs/common';
import { InsumoService } from './insumo.service';
import { InsumoController } from './insumo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insumo } from './entities/insumo.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports:[TypeOrmModule.forFeature([Insumo])],
  controllers: [InsumoController],
  providers: [InsumoService,{
    provide:APP_GUARD,
    useClass:AuthGuard
  }],
})
export class InsumoModule {}
