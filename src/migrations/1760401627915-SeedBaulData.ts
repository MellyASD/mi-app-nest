import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedBaulData1760401627915 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO role (name) VALUES ('Claire'), ('Leon');
    `);

    await queryRunner.query(`
      INSERT INTO item (name, type, value, quantity, restrictedTo)
      VALUES 
        ('Hierba Verde', 'curativa', 10, 5, NULL),
        ('Hierba Roja', 'curativa', 20, 3, NULL),
        ('Spray', 'curativa', 50, 2, NULL),
        ('Llave', 'especial', 0, 1, 'Leon'),
        ('Munición', 'combate', 15, 10, 'Claire');
    `);

    await queryRunner.query(`
      INSERT INTO role_items_item (roleId, itemId)
      VALUES
        ((SELECT id FROM role WHERE name = 'Claire'), (SELECT id FROM item WHERE name = 'Hierba Verde')),
        ((SELECT id FROM role WHERE name = 'Claire'), (SELECT id FROM item WHERE name = 'Hierba Roja')),
        ((SELECT id FROM role WHERE name = 'Claire'), (SELECT id FROM item WHERE name = 'Spray')),
        ((SELECT id FROM role WHERE name = 'Claire'), (SELECT id FROM item WHERE name = 'Munición')),
        ((SELECT id FROM role WHERE name = 'Leon'), (SELECT id FROM item WHERE name = 'Hierba Verde')),
        ((SELECT id FROM role WHERE name = 'Leon'), (SELECT id FROM item WHERE name = 'Hierba Roja')),
        ((SELECT id FROM role WHERE name = 'Leon'), (SELECT id FROM item WHERE name = 'Spray')),
        ((SELECT id FROM role WHERE name = 'Leon'), (SELECT id FROM item WHERE name = 'Llave'));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM role_items_item`);
    await queryRunner.query(`DELETE FROM item`);
    await queryRunner.query(`DELETE FROM role`);
  }
}