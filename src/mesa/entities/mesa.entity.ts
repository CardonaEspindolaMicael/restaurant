import { Pedido } from "../../pedido/entities/pedido.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Mesa {
 @PrimaryGeneratedColumn('uuid')
 id:string
 @Column({nullable:false})
 nro:number
 @Column({type:"varchar", length:"10",nullable:false})
 estado:string
 @Column({nullable:false})
 nrosillas:number
 @OneToMany(()=>Pedido,pedido=>pedido.mesa)
 pedido:Pedido[]
}
