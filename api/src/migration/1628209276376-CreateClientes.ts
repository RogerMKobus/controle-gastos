import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClientes1628209276376 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "clientes",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true
                    },
                    {
                        name: "empresa",
                        type: "varchar"
                    },
                    {
                        name: "nome",
                        type: "varchar"
                    },
                    {
                        name: "telefone",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "gastos_id",
                        type: "int"
                    },
                    {
                        name: "created_at",
                        type: "Date"
                    },
                    {
                        name: "updated_at",
                        type: "Date"
                    },
                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("clientes");
    }

}
