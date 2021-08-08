import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";
import { Clientes } from "./Clientes";

@Entity("gastos")
class Gastos {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    valor: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Clientes, cliente => cliente.gastos)
    cliente: Clientes

}

export { Gastos }