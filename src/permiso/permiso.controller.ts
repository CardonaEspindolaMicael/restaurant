import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { UUID } from 'crypto';
import { CreatePermisoDto } from './dto/createPermiso.dto';
import { UpdatePermisoDto } from './dto/updatePermiso.dto';

@Controller('permiso')
export class PermisoController {

  constructor(private permisoService:PermisoService){}

  @Post()
  createPermiso(@Body() permiso:CreatePermisoDto){
  return this.permisoService.createPermiso(permiso);
  }

  @Put(':id')
  updatePermiso(@Param('id') id:UUID,@Body()permiso:UpdatePermisoDto){
  return this.permisoService.updatePermiso(id,permiso);
  }
  @Get()
  getPermiso(){
    return this.permisoService.getPermiso();
  }
}
