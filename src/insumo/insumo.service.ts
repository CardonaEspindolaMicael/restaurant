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

    const newInsumo=this.insumoRepository.create(createInsumoDto);
    return this.insumoRepository.save(newInsumo);
    
  }

  findAllInsumo() {
    return this.insumoRepository.find();
  }

  findOneInsumo(id: string) {
    return this.insumoRepository.findOne({where:{
      id:id
    }});
  }

  async updateInsumo(id: string, updateInsumoDto: UpdateInsumoDto) {
    const existsInsumo=await this.insumoRepository.findOne({
      where:{
        id:id
      }
    })
    
    return existsInsumo ? this.insumoRepository.update({id},updateInsumoDto) : new HttpException('el insumo no existe',HttpStatus.NOT_FOUND) ;
  }

  async removeInsumo(id: string) {
    await this.insumoRepository.delete({id})
    return `This action removes a #${id} insumo`;
  }
}
