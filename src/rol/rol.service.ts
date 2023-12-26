import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/createRol.dto';
import { UpdateRolDto} from './dto/updateRol.dto'
import { Permiso } from 'src/permiso/permiso.entity';
import { insertRolPermiso } from './dto/insertRolPermiso.dto';
@Injectable()
export class RolService {
  constructor(@InjectRepository(Rol) private rolRepository:Repository<Rol>,
  @InjectRepository(Permiso) private permisoRepository:Repository<Permiso>){}

  async createRol(rol:CreateRolDto){
  const currentUser=await this.rolRepository.findOne({
    where:{
      cargo:rol.cargo
    }
  })
  if(currentUser){
    return  new HttpException('Rol ya existe',HttpStatus.CONFLICT)
  }
  const newUser= this.rolRepository.create(rol);
  return this.rolRepository.save(newUser);
  }

  async getRol(){
    try {

      return this.rolRepository.find()
    } catch (error) {
      return error
    }
    
  }

  async deleteRol(id:string){
    return await this.rolRepository.delete({id})
  }

  async updateRol(id:string,rol:UpdateRolDto){
   return await this.rolRepository.update({id},rol);

  }

  async insertRolPermiso(userPermiso:insertRolPermiso) {
    // Obtén las instancias de Rol y Permiso que deseas relacionar
    const rol = await this.rolRepository.findOne({ where:{
      id:userPermiso.id_Rol
    },
    relations: ['permiso']});
    const permiso = await this.permisoRepository.findOne({
      where:{
        id:userPermiso.id_Permiso
      }
    });
  
    // Verifica que el Rol y el Permiso existen
    if (!rol || !permiso) {
      throw new Error('Rol o Permiso no encontrado');
    }
  
    if (!rol.permiso) {
      rol.permiso = [];
    }
  
    // Agrega el Permiso al Rol
    rol.permiso.push(permiso);
  
    // Guarda el Rol con el nuevo Permiso
   return await this.rolRepository.save(rol);
  }
  
  async getRolPermiso(){
    return await this.rolRepository.find({
      relations:['permiso']
    })
  }

}
 