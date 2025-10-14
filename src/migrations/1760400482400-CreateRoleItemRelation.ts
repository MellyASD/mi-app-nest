import { MigrationInterface, QueryRunner } from "typeorm";
//* Migration to make age, quantity, and restrictedTo columns nullable */
export class CreateRoleItemRelation1760400482400 implements MigrationInterface {
    name = 'CreateRoleItemRelation1760400482400'
//* Migration to make age, quantity, and restrictedTo columns nullable */
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`quantity\` \`quantity\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`restrictedTo\` \`restrictedTo\` varchar(255) NULL`);
    }
//* Revert the changes made in the up method */
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`restrictedTo\` \`restrictedTo\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`quantity\` \`quantity\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NULL DEFAULT 'NULL'`);
    }

}
