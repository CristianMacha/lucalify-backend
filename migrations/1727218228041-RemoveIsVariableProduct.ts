import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveIsVariableProduct1727218228041 implements MigrationInterface {
    name = 'RemoveIsVariableProduct1727218228041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`isVariable\` \`isActive\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`isActive\` \`isVariable\` tinyint NOT NULL DEFAULT '0'`);
    }

}
