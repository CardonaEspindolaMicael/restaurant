import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InsumoService } from './insumo.service';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';

@Controller('insumo')
export class InsumoController {
  constructor(private readonly insumoService: InsumoService) {}

  @Post()
  create(@Body() createInsumoDto: CreateInsumoDto) {
    return this.insumoService.createInsumo(createInsumoDto);
  }

  @Get()
  findAll() {
    return this.insumoService.findAllInsumo();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insumoService.findOneInsumo(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInsumoDto: UpdateInsumoDto) {
    return this.insumoService.updateInsumo(+id, updateInsumoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.insumoService.removeInsumo(+id);
  }
}
