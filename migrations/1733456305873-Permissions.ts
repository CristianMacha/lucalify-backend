import { MigrationInterface, QueryRunner } from "typeorm";

export class Permissions1733456305873 implements MigrationInterface {
    name = 'Permissions1733456305873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_permissions\` (\`id\` varchar(255) NOT NULL, \`roleId\` varchar(36) NULL, \`permissionId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_c423dddbb21a687bd9b8a4cb6b1\``);
        await queryRunner.query(`ALTER TABLE \`payments\` CHANGE \`note\` \`note\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`payments\` CHANGE \`tradeId\` \`tradeId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ff56834e735fa78a15d0cf21926\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`categoryId\` \`categoryId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_trades\` DROP FOREIGN KEY \`FK_149ba22ae06af35657ec31b090b\``);
        await queryRunner.query(`ALTER TABLE \`product_trades\` DROP FOREIGN KEY \`FK_d9e098f6f516147020798572674\``);
        await queryRunner.query(`ALTER TABLE \`product_trades\` CHANGE \`productId\` \`productId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_trades\` CHANGE \`tradeId\` \`tradeId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` DROP FOREIGN KEY \`FK_2e8b502bb92dcbbcd441fcb5bac\``);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`email\` \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`phone\` \`phone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`address\` \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`typeDocumentId\` \`typeDocumentId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`trades\` DROP FOREIGN KEY \`FK_3512dcb88eab8168a88f9e34a50\``);
        await queryRunner.query(`ALTER TABLE \`trades\` CHANGE \`discount\` \`discount\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`trades\` CHANGE \`rounding\` \`rounding\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`trades\` CHANGE \`clientId\` \`clientId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roleId\` \`roleId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`branches\` DROP FOREIGN KEY \`FK_19db6a12993aa421cc984376635\``);
        await queryRunner.query(`ALTER TABLE \`branches\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`branches\` CHANGE \`tenantId\` \`tenantId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`tenants\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_c423dddbb21a687bd9b8a4cb6b1\` FOREIGN KEY (\`tradeId\`) REFERENCES \`trades\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ff56834e735fa78a15d0cf21926\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_trades\` ADD CONSTRAINT \`FK_149ba22ae06af35657ec31b090b\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_trades\` ADD CONSTRAINT \`FK_d9e098f6f516147020798572674\` FOREIGN KEY (\`tradeId\`) REFERENCES \`trades\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`clients\` ADD CONSTRAINT \`FK_2e8b502bb92dcbbcd441fcb5bac\` FOREIGN KEY (\`typeDocumentId\`) REFERENCES \`type_documents\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`trades\` ADD CONSTRAINT \`FK_3512dcb88eab8168a88f9e34a50\` FOREIGN KEY (\`clientId\`) REFERENCES \`clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_b4599f8b8f548d35850afa2d12c\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_06792d0c62ce6b0203c03643cdd\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`branches\` ADD CONSTRAINT \`FK_19db6a12993aa421cc984376635\` FOREIGN KEY (\`tenantId\`) REFERENCES \`tenants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`branches\` DROP FOREIGN KEY \`FK_19db6a12993aa421cc984376635\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_06792d0c62ce6b0203c03643cdd\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_b4599f8b8f548d35850afa2d12c\``);
        await queryRunner.query(`ALTER TABLE \`trades\` DROP FOREIGN KEY \`FK_3512dcb88eab8168a88f9e34a50\``);
        await queryRunner.query(`ALTER TABLE \`clients\` DROP FOREIGN KEY \`FK_2e8b502bb92dcbbcd441fcb5bac\``);
        await queryRunner.query(`ALTER TABLE \`product_trades\` DROP FOREIGN KEY \`FK_d9e098f6f516147020798572674\``);
        await queryRunner.query(`ALTER TABLE \`product_trades\` DROP FOREIGN KEY \`FK_149ba22ae06af35657ec31b090b\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ff56834e735fa78a15d0cf21926\``);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_c423dddbb21a687bd9b8a4cb6b1\``);
        await queryRunner.query(`ALTER TABLE \`tenants\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`branches\` CHANGE \`tenantId\` \`tenantId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`branches\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`branches\` ADD CONSTRAINT \`FK_19db6a12993aa421cc984376635\` FOREIGN KEY (\`tenantId\`) REFERENCES \`tenants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roleId\` \`roleId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`trades\` CHANGE \`clientId\` \`clientId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`trades\` CHANGE \`rounding\` \`rounding\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`trades\` CHANGE \`discount\` \`discount\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`trades\` ADD CONSTRAINT \`FK_3512dcb88eab8168a88f9e34a50\` FOREIGN KEY (\`clientId\`) REFERENCES \`clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`typeDocumentId\` \`typeDocumentId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`phone\` \`phone\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`email\` \`email\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`clients\` ADD CONSTRAINT \`FK_2e8b502bb92dcbbcd441fcb5bac\` FOREIGN KEY (\`typeDocumentId\`) REFERENCES \`type_documents\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_trades\` CHANGE \`tradeId\` \`tradeId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_trades\` CHANGE \`productId\` \`productId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_trades\` ADD CONSTRAINT \`FK_d9e098f6f516147020798572674\` FOREIGN KEY (\`tradeId\`) REFERENCES \`trades\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_trades\` ADD CONSTRAINT \`FK_149ba22ae06af35657ec31b090b\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`categoryId\` \`categoryId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ff56834e735fa78a15d0cf21926\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`payments\` CHANGE \`tradeId\` \`tradeId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`payments\` CHANGE \`note\` \`note\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_c423dddbb21a687bd9b8a4cb6b1\` FOREIGN KEY (\`tradeId\`) REFERENCES \`trades\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`role_permissions\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
    }

}
