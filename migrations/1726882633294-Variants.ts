import { MigrationInterface, QueryRunner } from "typeorm";

export class Variants1726882633294 implements MigrationInterface {
    name = 'Variants1726882633294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product_variants\` (\`id\` varchar(255) NOT NULL, \`stock\` int NOT NULL DEFAULT '0', \`price\` decimal(10,2) NOT NULL DEFAULT '0.00', \`productId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_variant_attributes\` (\`product_variant_id\` varchar(255) NOT NULL, \`attribute_value_id\` varchar(255) NOT NULL, PRIMARY KEY (\`product_variant_id\`, \`attribute_value_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product_variants\` ADD CONSTRAINT \`FK_f515690c571a03400a9876600b5\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variant_attributes\` ADD CONSTRAINT \`FK_fee6822a4a34dddc37609f56dd6\` FOREIGN KEY (\`product_variant_id\`) REFERENCES \`product_variants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variant_attributes\` ADD CONSTRAINT \`FK_04f2b165e1c605cfbf30c5f962e\` FOREIGN KEY (\`attribute_value_id\`) REFERENCES \`attribute_values\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_variant_attributes\` DROP FOREIGN KEY \`FK_04f2b165e1c605cfbf30c5f962e\``);
        await queryRunner.query(`ALTER TABLE \`product_variant_attributes\` DROP FOREIGN KEY \`FK_fee6822a4a34dddc37609f56dd6\``);
        await queryRunner.query(`ALTER TABLE \`product_variants\` DROP FOREIGN KEY \`FK_f515690c571a03400a9876600b5\``);
        await queryRunner.query(`DROP TABLE \`product_variant_attributes\``);
        await queryRunner.query(`DROP TABLE \`product_variants\``);
    }

}
