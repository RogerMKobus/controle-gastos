import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class ClientesGastosFK1628384956508 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("gastos", new TableColumn({
            name: "clientesId",
            type: "int"
        }))

        await queryRunner.createForeignKey("gastos", new TableForeignKey({
            columnNames: ["clientesId"],
            referencedColumnNames: ["id"],
            referencedTableName: "clientes",
            onDelete: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("gastos");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("clientesId") !== -1);
        await queryRunner.dropForeignKey("gastos", foreignKey);
        await queryRunner.dropColumn("gastos", "clientesId");
    }

}
