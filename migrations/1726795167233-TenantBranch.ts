import { MigrationInterface, QueryRunner } from "typeorm";

export class TenantBranch1726795167233 implements MigrationInterface {
    name = 'TenantBranch1726795167233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`branches\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`tenantId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tenants\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`ruc\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`createdBy\` varchar(255) NOT NULL, \`updatedBy\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, UNIQUE INDEX \`IDX_3d357209e328784b938a13a0a8\` (\`ruc\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`branches\` ADD CONSTRAINT \`FK_19db6a12993aa421cc984376635\` FOREIGN KEY (\`tenantId\`) REFERENCES \`tenants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`branches\` DROP FOREIGN KEY \`FK_19db6a12993aa421cc984376635\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`DROP INDEX \`IDX_3d357209e328784b938a13a0a8\` ON \`tenants\``);
        await queryRunner.query(`DROP TABLE \`tenants\``);
        await queryRunner.query(`DROP TABLE \`branches\``);
    }

}
