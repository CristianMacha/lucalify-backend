import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePriceToProduct1727202100971 implements MigrationInterface {
    name = 'RemovePriceToProduct1727202100971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`price\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`price\` decimal NULL DEFAULT '0.00'`);
    }

}
