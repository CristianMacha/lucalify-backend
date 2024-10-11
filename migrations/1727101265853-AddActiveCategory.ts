import { MigrationInterface, QueryRunner } from "typeorm";

export class AddActiveCategory1727101265853 implements MigrationInterface {
    name = 'AddActiveCategory1727101265853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`active\` tinyint NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`active\``);
    }

}
