import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleColumnToUser1760305202779 implements MigrationInterface {
    name = 'AddRoleColumnToUser1760305202779'
//* Migration to add role column to user and create product, combo, and item tables with relationships */
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`price\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`combo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`restrictedTo\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`combo_items_product\` (\`comboId\` int NOT NULL, \`productId\` int NOT NULL, INDEX \`IDX_fe85a0a081e2f355a55f0d3c8f\` (\`comboId\`), INDEX \`IDX_79ddc0ce99457c09b6bebffea1\` (\`productId\`), PRIMARY KEY (\`comboId\`, \`productId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL DEFAULT 'cliente'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`combo_items_product\` ADD CONSTRAINT \`FK_fe85a0a081e2f355a55f0d3c8fb\` FOREIGN KEY (\`comboId\`) REFERENCES \`combo\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`combo_items_product\` ADD CONSTRAINT \`FK_79ddc0ce99457c09b6bebffea19\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }
//* Revert the changes made in the up method */
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`combo_items_product\` DROP FOREIGN KEY \`FK_79ddc0ce99457c09b6bebffea19\``);
        await queryRunner.query(`ALTER TABLE \`combo_items_product\` DROP FOREIGN KEY \`FK_fe85a0a081e2f355a55f0d3c8fb\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
        await queryRunner.query(`DROP INDEX \`IDX_79ddc0ce99457c09b6bebffea1\` ON \`combo_items_product\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe85a0a081e2f355a55f0d3c8f\` ON \`combo_items_product\``);
        await queryRunner.query(`DROP TABLE \`combo_items_product\``);
        await queryRunner.query(`DROP TABLE \`item\``);
        await queryRunner.query(`DROP TABLE \`combo\``);
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
