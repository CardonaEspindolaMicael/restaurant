import { Rol } from "src/rol/rol.entity"
import { generos } from "../users.entity"

export class updateUserDto{
  username?:string
  nombre?:string
  contraseña?:string
  fechaNacimiento?:Date
  genero?:generos
  email?:string
  id_Rol?:string
}