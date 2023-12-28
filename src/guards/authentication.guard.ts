import { Injectable,CanActivate,ExecutionContext} from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class AuthenticationGuard implements CanActivate{
 canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
   console.log('inside the guard')
   return true;
 }
}