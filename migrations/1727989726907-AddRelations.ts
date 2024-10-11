import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelations1727989726907 implements MigrationInterface {
    name = 'AddRelations1727989726907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product_sales\` (\`id\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`price\` decimal(10,2) NOT NULL, \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`productId\` varchar(36) NULL, \`saleId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sales\` (\`id\` varchar(255) NOT NULL, \`total\` int NOT NULL, \`discount\` int NULL, \`rounding\` int NULL, \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`clientId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payments\` (\`id\` varchar(255) NOT NULL, \`amount\` int NOT NULL, \`note\` varchar(255) NULL, \`paymentDate\` timestamp NOT NULL, \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`saleId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product_sales\` ADD CONSTRAINT \`FK_52f4d914ccec1dca35f149f34b7\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_sales\` ADD CONSTRAINT \`FK_2005f4cae3fb5c8131cf1024430\` FOREIGN KEY (\`saleId\`) REFERENCES \`sales\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sales\` ADD CONSTRAINT \`FK_c0ae0d7fce67f97394e3a250a33\` FOREIGN KEY (\`clientId\`) REFERENCES \`clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_e15427928c7a02bd304d628c41e\` FOREIGN KEY (\`saleId\`) REFERENCES \`sales\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_e15427928c7a02bd304d628c41e\``);
        await queryRunner.query(`ALTER TABLE \`sales\` DROP FOREIGN KEY \`FK_c0ae0d7fce67f97394e3a250a33\``);
        await queryRunner.query(`ALTER TABLE \`product_sales\` DROP FOREIGN KEY \`FK_2005f4cae3fb5c8131cf1024430\``);
        await queryRunner.query(`ALTER TABLE \`product_sales\` DROP FOREIGN KEY \`FK_52f4d914ccec1dca35f149f34b7\``);
        await queryRunner.query(`DROP TABLE \`payments\``);
        await queryRunner.query(`DROP TABLE \`sales\``);
        await queryRunner.query(`DROP TABLE \`product_sales\``);
    }

}
