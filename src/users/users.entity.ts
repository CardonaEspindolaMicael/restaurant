import { IsDate, IsEmail} from "class-validator";
import { Entity,Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { Rol } from "../rol/rol.entity";

export enum generos{
    masculino = "M",
    femenino = "F",
    indefinido = "U",
} 

@Entity({name:'usuario'})
export class User{
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({unique:true,type:'varchar',length:'256',nullable:false})
  username: string
  @Column({type:'varchar',length:'256',nullable:false})
  nombre:string
  @Column({type:'varchar',length:'256',nullable:false})
  contraseña: string
  @Column({type:"date"})
  @IsDate()
  fechaNacimiento: Date
  @Column({type:'char',nullable:false})
  genero: generos
  @Column({nullable:true,type:'varchar',length:'256'})
  @IsEmail()
  email: string
  @Column({nullable:true,default:'https://cdn-icons-png.flaticon.com/512/3282/3282224.png'})
  imagen:string
  @Column({nullable:false})
  id_Rol:String
  @ManyToOne(()=>Rol, rol=> rol.id)
  @JoinColumn({name:'id_Rol'})
  rol:Rol;

}
