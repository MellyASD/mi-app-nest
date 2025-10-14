import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedPanaderiaData1697220000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Limpieza previa 
    await queryRunner.query(`DELETE FROM combo_products_product`);
    await queryRunner.query(`DELETE FROM combo`);
    await queryRunner.query(`DELETE FROM product`);

    // Insertar productos
    await queryRunner.query(`
      INSERT INTO product (id, name, price) VALUES 
      (1, 'Café', 2500),
      (2, 'Pan', 1500),
      (3, 'Jugo', 3000)
    `);

    // Insertar combo
    await queryRunner.query(`
      INSERT INTO combo (id, name) VALUES (1, 'Desayuno 1')
    `);

    // Insertar relaciones sin duplicar
    await queryRunner.query(`
      INSERT IGNORE INTO combo_products_product (comboId, productId) VALUES 
      (1, 1),
      (1, 2),
      (1, 3)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM combo_products_product`);
    await queryRunner.query(`DELETE FROM combo`);
    await queryRunner.query(`DELETE FROM product`);
  }
}