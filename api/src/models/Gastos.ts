import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    BaseEntity,
    JoinColumn
} from "typeorm";
import { Clientes } from "./Clientes";
import { ObjectType, Field, ID } from "type-graphql";

@Entity("gastos")
@ObjectType()
class Gastos extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Number)
    @Column(({ type: 'decimal' }))
    valor: number;

    @Field(() => Date)
    @CreateDateColumn()
    data: Date;

    @Field(() => Date)
    @CreateDateColumn()
    created_at: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updated_at: Date;

    @Field(() => Clientes)
    @JoinColumn({ name: 'cliente_id' })
    @ManyToOne(() => Clientes, cliente => cliente)
    cliente: Clientes;

}

export { Gastos }