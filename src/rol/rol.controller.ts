import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/createRol.dto';
import { UUID } from 'crypto';
import { UpdateRolDto } from './dto/updateRol.dto';
import { insertRolPermiso } from './dto/insertRolPermiso.dto';

@Controller('rol')
export class RolController {

  constructor(private rolService:RolService){}
 
  @Post()
  createRoles(@Body() user:CreateRolDto){
    return this.rolService.createRol(user);
  }

  @Get()
  getRoles(){
  return this.rolService.getRol();
  }
  @Delete(':id')
  deleteRol(@Param('id') id:UUID ){
  return this.rolService.deleteRol(id);
  }
  @Put(':id')
  updateRol(@Param('id') id:UUID,@Body() rol:UpdateRolDto){
  return this.rolService.updateRol(id,rol);
  }
  @Post('/RolPermiso')
  insertRolPermiso(@Body() userPermiso:insertRolPermiso){
  return this.rolService.insertRolPermiso(userPermiso);
  }
  @Get('/RolPermiso')
  getRolPermiso(){
    return this.rolService.getRolPermiso();
  }
}
