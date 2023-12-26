
import { generos } from "../users.entity"

export class CreateUserDto{
username:string
nombre:string
contraseña:string
fechaNacimiento:Date
genero:generos
email?:string
imagen?:string
id_Rol:string
}