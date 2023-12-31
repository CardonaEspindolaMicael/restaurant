import { HttpException, Inject, Injectable,HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';
import { ChangePasswordDTO } from './dto/changePassword.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository:Repository<User>){}
   
  async createUser(user:CreateUserDto){
  
  const currentUser= await this.userRepository.findOne({
    where:{
      username:user.username
    }
  })

  if(currentUser){
    return new HttpException('User already exist',HttpStatus.CONFLICT);
  }
   user.contrasena=(await this.encryptarContraseña(user.contrasena));
  const newUser=this.userRepository.create(user);
  return this.userRepository.save(newUser);
  }

  async getUser(){
    return await this.userRepository.find();
  }

  async getAnUser(username:string){
   return await this.userRepository.findOne({
    where:{
      username:username
    }
   })
  }

  async deleteUser(id:string){
   return await this.userRepository.delete({ id });
  }

  async updateUser(id:string,user:updateUserDto){
    return await this.userRepository.update({id},user)

  }
  async encryptarContraseña(contraseña:string) {
    const salt = await bcrypt.genSalt(5);
    const newHash = await bcrypt.hash(contraseña, salt);
    return newHash;
  }

  async cambiarContraseña(id:string,contraChanged:ChangePasswordDTO){
  const existsUser= this.userRepository.findOne({
    where:{
      id:id
    }
  })
  if(!existsUser){
    return new HttpException('User not exists',HttpStatus.CONFLICT);
  }
   
 
  const match = await bcrypt.compare(
    contraChanged.contrasenaActual,
    (await existsUser).contrasena
  );

  const nuevaContraseñaEncryptada=await this.encryptarContraseña(contraChanged.nuevaContrasena)
  if (match) {
  return  await this.userRepository.update({id: id}, {contrasena: nuevaContraseñaEncryptada});
} else {
    throw new HttpException('Contraseña no coinciden', HttpStatus.AMBIGUOUS);
}
  
  }

}
