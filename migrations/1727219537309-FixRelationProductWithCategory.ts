import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelationProductWithCategory1727219537309 implements MigrationInterface {
    name = 'FixRelationProductWithCategory1727219537309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`categoryId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ff56834e735fa78a15d0cf21926\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ff56834e735fa78a15d0cf21926\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`categoryId\``);
    }

}
