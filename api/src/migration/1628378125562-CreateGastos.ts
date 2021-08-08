import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGastos1628378125562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "gastos",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true
                    },
                    {
                        name: "valor",
                        type: "numeric"
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
        await queryRunner.dropTable("gastos")
    }

}
