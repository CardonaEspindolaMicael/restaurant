import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Insumo } from './entities/insumo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InsumoService {
  constructor(@InjectRepository(Insumo) private insumoRepository:Repository<Insumo>){

  }
  async createInsumo(createInsumoDto: CreateInsumoDto) {
    const existsInsumo=await this.insumoRepository.findOne({
      where:{
        nombre:(createInsumoDto.nombre).trim()
      }
    })

    if(existsInsumo){
      return new HttpException(`el insumo con nombre ${createInsumoDto.nombre} ya existe`,HttpStatus.CONFLICT)
    }
    const newInsumo=this.insumoRepository.create(createInsumoDto);
    return this.insumoRepository.save(newInsumo);
    
  }

  findAllInsumo() {
    return this.insumoRepository.find();
  }

  findOneInsumo(id: number) {
    return `This action returns a #${id} insumo`;
  }

  updateInsumo(id: number, updateInsumoDto: UpdateInsumoDto) {
    return `This action updates a #${id} insumo`;
  }

  removeInsumo(id: number) {
    return `This action removes a #${id} insumo`;
  }
}
