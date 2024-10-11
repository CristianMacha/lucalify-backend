import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1726777796225 implements MigrationInterface {
    name = 'Initial1726777796225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
