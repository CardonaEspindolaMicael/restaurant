import { User } from "../../users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Insumo {
@PrimaryGeneratedColumn('uuid')
id:string
@Column({type:'varchar', length:'256', nullable:false})
nombre:string
@Column({type:'float', nullable:false})
cantidad:number
@Column({type:'varchar', length:'256', nullable:true})
descripcion:string
@Column({type:'date',nullable:false})
fecha:Date
@Column({nullable:false})
id_usuario:string
@ManyToOne(() => User, user => user.insumo)
  @JoinColumn({name:'id_usuario'})
  user: User;
}

