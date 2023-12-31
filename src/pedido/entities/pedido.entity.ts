import { Mesa } from "../../mesa/entities/mesa.entity";
import { User } from "../../users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Pedido {
  @PrimaryGeneratedColumn('uuid')
  id:string
  @Column({nullable:false,type:"int"})
  nro:number
  @Column({nullable:false,type:"varchar"})
  estado:string
  @Column({nullable:false,type:"float"})
  total:number
  @Column({nullable:false,type:"float"})
  descuento:number
  @Column({nullable:false,length:256})
  detalle:string
  @Column({nullable:false,type:"date"})
  fecha:Date
  @Column({nullable:false})
  id_mesa:string
  @Column({nullable:false})
  id_usuario:string
  @ManyToOne(()=>Mesa,mesa=>mesa.pedido)
  @JoinColumn({name:"id_mesa"})
  mesa:Mesa
  @ManyToOne(()=>User,user=>user.pedido)
  @JoinColumn({name:"id_usuario"})
  user:User
}

