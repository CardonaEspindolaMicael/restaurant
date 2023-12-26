import { Rol } from "../rol/rol.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permiso{
@PrimaryGeneratedColumn('uuid')
id:string
@Column({type:'varchar',length:60})
nombre:string
@Column({type:'varchar',length:256,nullable:true})
descripcion:string
@ManyToMany(()=>Rol,(rol)=>rol.id)
rol:Rol[];
}