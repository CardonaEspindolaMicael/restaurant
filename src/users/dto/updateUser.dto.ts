import { Rol } from "src/rol/rol.entity"
import { generos } from "../users.entity"

export class updateUserDto{
  username?:string
  nombre?:string
  contrasena?:string
  fechanacimiento?:Date
  genero?:generos
  email?:string
  id_rol?:string
}