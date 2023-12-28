import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginAuthDTO } from './dto/login-auth.dto';
import { Public } from 'src/decorator/public.decorator';


@Controller('auth')
export class AuthController {
 constructor(private readonly AuthService:AuthService){
 }
 
@Public()
@HttpCode(HttpStatus.OK)
@Post('login')
signIn(@Body() loginUser:loginAuthDTO){
return this.AuthService.signIn(loginUser);
}

@Get('profile')
getProfile(@Body() req) {
  return req;
}
}

