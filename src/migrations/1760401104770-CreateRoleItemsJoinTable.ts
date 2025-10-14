import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoleItemsJoinTable1760401104770 implements MigrationInterface {
    name = 'CreateRoleItemsJoinTable1760401104770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role_items_item\` (\`roleId\` int NOT NULL, \`itemId\` int NOT NULL, INDEX \`IDX_4678278d8f4c8561eee8642919\` (\`roleId\`), INDEX \`IDX_7eb1f2cf56f4630343bfb3ac33\` (\`itemId\`), PRIMARY KEY (\`roleId\`, \`itemId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`quantity\` \`quantity\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`restrictedTo\` \`restrictedTo\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`role_items_item\` ADD CONSTRAINT \`FK_4678278d8f4c8561eee86429190\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`role_items_item\` ADD CONSTRAINT \`FK_7eb1f2cf56f4630343bfb3ac331\` FOREIGN KEY (\`itemId\`) REFERENCES \`item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role_items_item\` DROP FOREIGN KEY \`FK_7eb1f2cf56f4630343bfb3ac331\``);
        await queryRunner.query(`ALTER TABLE \`role_items_item\` DROP FOREIGN KEY \`FK_4678278d8f4c8561eee86429190\``);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`restrictedTo\` \`restrictedTo\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`item\` CHANGE \`quantity\` \`quantity\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_7eb1f2cf56f4630343bfb3ac33\` ON \`role_items_item\``);
        await queryRunner.query(`DROP INDEX \`IDX_4678278d8f4c8561eee8642919\` ON \`role_items_item\``);
        await queryRunner.query(`DROP TABLE \`role_items_item\``);
    }

}
