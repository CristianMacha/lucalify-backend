import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCodeTypeDocument1727644261786 implements MigrationInterface {
    name = 'AddCodeTypeDocument1727644261786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`type_documents\` ADD \`code\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`type_documents\` DROP COLUMN \`code\``);
    }

}
