import * as dotenv from 'dotenv';
import { User } from './src/entities/user.entity';
import { DataSource } from 'typeorm';
dotenv.config();

export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,  
    port: Number(process.env.DB_PORT) ,
    username: process.env.DB_USERNAME,  
    password: process.env.DB_PASSWORD,  
    database: process.env.DB_NAME,  
    entities: [User],
    migrations: ['./src/migrations/*.ts'],

   
}); // synchronize: true, // Usar solo en desarrollo, no en producción
// logging: true, // Habilitar para ver las consultas SQL en la consola
// migrationsRun: true, // Ejecutar migraciones automáticamente al iniciar la aplicación
// cli: {
//     migrationsDir: 'src/migrations',
// },