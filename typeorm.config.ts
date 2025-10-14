import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { User } from './src/entities/user.entity'
import { Item } from './src/entities/item.entity'
import { Combo } from './src/entities/combo.entity'
import { Role } from './src/entities/role.entity';
import { Product } from './src/entities/product.entity';


dotenv.config()

export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Product, Item, Combo, Role],
    migrations: ['./src/migrations/*.ts'],
    synchronize: false
});