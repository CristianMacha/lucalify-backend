import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsVarialbleProduct1727211321437 implements MigrationInterface {
    name = 'AddIsVarialbleProduct1727211321437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_variants\` CHANGE \`stock\` \`code\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`price\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`isVariable\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`stock\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD UNIQUE INDEX \`IDX_7cfc24d6c24f0ec91294003d6b\` (\`code\`)`);
        await queryRunner.query(`ALTER TABLE \`product_variants\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`product_variants\` ADD \`code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_variants\` ADD UNIQUE INDEX \`IDX_0e51d8574cd574a0fcca08778c\` (\`code\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_variants\` DROP INDEX \`IDX_0e51d8574cd574a0fcca08778c\``);
        await queryRunner.query(`ALTER TABLE \`product_variants\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`product_variants\` ADD \`code\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP INDEX \`IDX_7cfc24d6c24f0ec91294003d6b\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`stock\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`isVariable\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`product_variants\` CHANGE \`code\` \`stock\` int NOT NULL DEFAULT '0'`);
    }

}
