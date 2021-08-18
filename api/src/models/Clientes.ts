import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
    BaseEntity
} from "typeorm";
import { Gastos } from "./Gastos";
import { ObjectType, Field, ID } from "type-graphql";

@Entity("clientes")
@ObjectType()
class Clientes extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    empresa: string;

    @Field(() => String)
    @Column()
    nome: string;

    @Field(() => String)
    @Column()
    telefone: string;

    @Field(() => String)
    @Column()
    email: string;

    @Field(() => Date)
    @CreateDateColumn()
    created_at: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updated_at: Date;

    @Field(() => [Gastos])
    @OneToMany(() => Gastos, gasto => gasto.cliente)
    gastos: Gastos[];

}

export { Clientes }