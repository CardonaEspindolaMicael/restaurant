import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { UUID } from 'crypto';
import { updateUserDto } from './dto/updateUser.dto';

import { ChangePasswordDTO } from './dto/changePassword.dto';



@Controller('users')
export class UsersController {
constructor(private userService:UsersService){}
@Post()
 createUser(@Body() newUser:CreateUserDto){
 return  this.userService.createUser(newUser);
}

@Get()
getUser(){
  return this.userService.getUser();
}

@Get(':username')
 getAnUser(@Param('username') username: string){

return this.userService.getAnUser(username);
}

@Delete(':id')
deleteUser(@Param('id') id:UUID){
  return this.userService.deleteUser(id);
}

@Put(':id')
updateUser(@Param('id') id:UUID, @Body() user:updateUserDto){
return this.userService.updateUser(id,user);
}

@Put('cambiarContrasena/:id')
cambiarContraseña(@Param('id') id:UUID,@Body() contraChanged:ChangePasswordDTO){
return this.userService.cambiarContraseña(id,contraChanged)
}
}
