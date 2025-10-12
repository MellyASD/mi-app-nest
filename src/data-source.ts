import { DataSource } from 'typeorm';
import { Combo } from './entities/combo.entity';
import { Item } from './entities/item.entity';
import { Product } from './entities/product.entity';
import { User } from './entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root', // tu usuario
  password: '',
  database: 'mi_app_nest', // tu base de datos
  entities: [Combo, Item, Product, User], // agrega aquí todas tus entidades
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});