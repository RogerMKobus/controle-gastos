import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("clientes")
class Clientes{
    
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

    /*
    @Column()
    gastos_id: string;
    */
    
}

export { Clientes }