import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { Gastos } from "./Gastos";

@Entity("clientes")
class Clientes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    empresa: string;

    @Column()
    nome: string;

    @Column()
    telefone: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Gastos, gasto => gasto.cliente)
    gastos: Gastos[];

}

export { Clientes }