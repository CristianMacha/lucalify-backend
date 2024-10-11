import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClient1727285465307 implements MigrationInterface {
    name = 'AddClient1727285465307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`type_documents\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clients\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`documentNumber\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`phone\` varchar(255) NULL, \`address\` varchar(255) NULL, \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`typeDocumentId\` varchar(36) NULL, UNIQUE INDEX \`IDX_d866e63d1c138ea2de12f4676e\` (\`documentNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`clients\` ADD CONSTRAINT \`FK_2e8b502bb92dcbbcd441fcb5bac\` FOREIGN KEY (\`typeDocumentId\`) REFERENCES \`type_documents\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clients\` DROP FOREIGN KEY \`FK_2e8b502bb92dcbbcd441fcb5bac\``);
        await queryRunner.query(`DROP INDEX \`IDX_d866e63d1c138ea2de12f4676e\` ON \`clients\``);
        await queryRunner.query(`DROP TABLE \`clients\``);
        await queryRunner.query(`DROP TABLE \`type_documents\``);
    }

}
