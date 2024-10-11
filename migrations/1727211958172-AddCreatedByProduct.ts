import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedByProduct1727211958172 implements MigrationInterface {
    name = 'AddCreatedByProduct1727211958172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`createdBy\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`updatedBy\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`updatedBy\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`createdBy\``);
    }

}
