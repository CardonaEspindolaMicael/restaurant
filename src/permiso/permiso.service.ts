import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Permiso } from './permiso.entity';
import { CreatePermisoDto } from './dto/createPermiso.dto';
import { UpdatePermisoDto } from './dto/updatePermiso.dto';

@Injectable()
export class PermisoService {
  constructor(@InjectRepository(Permiso) private permisoRepository:Repository<Permiso>
){}

  async createPermiso(permiso:CreatePermisoDto){
   const currentPermiso=await this.permisoRepository.findOne({
    where:{
      nombre:permiso.nombre
    }
   })
   console.log(currentPermiso+"SOY EL ERROR");

   if(currentPermiso){
    return new HttpException("Permiso ya existe",409);
   }
   const newPermiso=this.permisoRepository.create(permiso);
   return this.permisoRepository.save(newPermiso);
  }

  async getPermiso(){
    return this.permisoRepository.find();
  }

  async updatePermiso(id:string,permiso:UpdatePermisoDto){
    return await this.permisoRepository.update({id},permiso);
  }

}

