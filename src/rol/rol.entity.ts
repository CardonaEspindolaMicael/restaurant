import { Permiso } from "../permiso/permiso.entity";
import { User } from "../users/users.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rol{
@PrimaryGeneratedColumn('uuid')
id:string
@Column({type:'varchar',length:256})
cargo:string
@Column({type:'varchar',length:256})
descripcion:string
@OneToMany(()=>User,(user)=>user.id)
user:User[];
@ManyToMany(()=>Permiso,(permiso)=>permiso.id)
@JoinTable({
  name:'rol_Permiso',
  joinColumn:{
    name:'id_rol'
  },
  inverseJoinColumn:{
    name:'id_permiso'
  }
})
permiso:Permiso[];
}