import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCategory1726805848702 implements MigrationInterface {
    name = 'ProductCategory1726805848702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`price\` decimal(10,2) NULL DEFAULT '0.00', \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`roleId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`roleId\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }

}
