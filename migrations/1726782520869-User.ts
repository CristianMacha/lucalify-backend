import { MigrationInterface, QueryRunner } from "typeorm";

export class User1726782520869 implements MigrationInterface {
    name = 'User1726782520869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`deleted\` tinyint NOT NULL, \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
