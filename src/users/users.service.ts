import { HttpException, Inject, Injectable,HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';


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
}
