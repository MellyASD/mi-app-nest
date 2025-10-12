import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Primary application module and configuration
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChestModule } from './modules/chest-re2/chest.module';
import { PanaderiaModule } from './modules/Panaderia/panaderia.module';

@Module({
  imports: [
    //  Configuración global con variables de entorno
    ConfigModule.forRoot({ isGlobal: true }),

    //  Conexión a MySQL con TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false, // usa migraciones en producción
      }),
    }),

    //  Módulos funcionales
    UsersModule,
    AuthModule,
    ChestModule,
    PanaderiaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}