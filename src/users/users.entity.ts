import { IsDate, IsEmail} from "class-validator";
import { Entity,Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Rol } from "../rol/rol.entity";
import { Insumo } from "../insumo/entities/insumo.entity";

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
  contrasena: string
  @Column({type:"date"})
  @IsDate()
  fechanacimiento: Date
  @Column({type:'char',nullable:false})
  genero: generos
  @Column({nullable:true,type:'varchar',length:'256'})
  @IsEmail()
  email: string
  @Column({nullable:true,default:'https://cdn-icons-png.flaticon.com/512/3282/3282224.png'})
  imagen:string
  @Column({nullable:false})
  id_rol:String
  @OneToMany(()=>Insumo,(insumo)=>insumo.user)
  insumo:Insumo[]
  @ManyToOne(()=>Rol, rol=> rol.id)
  @JoinColumn({name:'id_rol'})
  rol:Rol;

}
