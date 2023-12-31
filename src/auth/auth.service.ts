import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm'; 
import { loginAuthDTO } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor( @InjectRepository(User) private userRepository:Repository<User>,
    private jwtService: JwtService
  ) {}

  async signIn(loginUser:loginAuthDTO) {
    const user = await this.userRepository.findOne({
      where:{
        username:loginUser.username
      }
    });
    const match = await bcrypt.compare(
      loginUser.pass,
      user.contrasena
    );
    if (!!!match) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
