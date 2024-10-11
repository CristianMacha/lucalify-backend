import { MigrationInterface, QueryRunner } from "typeorm";

export class Attributes1726876787742 implements MigrationInterface {
    name = 'Attributes1726876787742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`attribute_values\` (\`id\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`deleted\` tinyint NOT NULL DEFAULT 0, \`attributeId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attributes\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`deleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`attribute_values\` ADD CONSTRAINT \`FK_b8f8e1d9141248b538c9285574e\` FOREIGN KEY (\`attributeId\`) REFERENCES \`attributes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attribute_values\` DROP FOREIGN KEY \`FK_b8f8e1d9141248b538c9285574e\``);
        await queryRunner.query(`DROP TABLE \`attributes\``);
        await queryRunner.query(`DROP TABLE \`attribute_values\``);
    }

}
