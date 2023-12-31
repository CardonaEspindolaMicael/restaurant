import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mesa } from './entities/mesa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MesaService {
  constructor(@InjectRepository(Mesa) private mesaRepository:Repository<Mesa>){}
  async create(createMesaDto: CreateMesaDto) {

     console.log(createMesaDto)
     const newMesa=this.mesaRepository.create(createMesaDto);
     
    return this.mesaRepository.save(newMesa);
  }

  findAll() {
    return this.mesaRepository.find();
  }

  findOne(id: string) {
    const existsMesa=this.mesaRepository.findOne({
      where:{
        id
      }
    })
    return existsMesa ? existsMesa : new HttpException(`El id ${id} no existe`,HttpStatus.BAD_REQUEST) ;
  }

  update(id: string, updateMesaDto: UpdateMesaDto) {
    const existsMesa=this.mesaRepository.findOne({
      where:{
        id
      }
    })
    return existsMesa ? this.mesaRepository.update({id},updateMesaDto) : new HttpException(`El id ${id} no existe`,HttpStatus.BAD_REQUEST) ;
  }

  remove(id: string) {
    const existsMesa=this.mesaRepository.findOne({
      where:{
        id
      }
    })
    return existsMesa ? this.mesaRepository.delete({id}) : new HttpException(`El id ${id} no existe`,HttpStatus.BAD_REQUEST) ;
  }
}
