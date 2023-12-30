
import { generos } from "../users.entity"

export class CreateUserDto{
username:string
nombre:string
contrasena:string
fechanacimiento:Date
genero:generos
email:string
imagen?:string
id_rol:string
}