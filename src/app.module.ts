import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';
import { ChestModule } from './modules/chest-re2/chest.module';
import { ChestController } from './modules/chest-re2/chest.controller';
import { ChestService } from './modules/chest-re2/chest.service';
import { PanaderiaModule } from './modules/Panaderia/panaderia.module';
import { PanaderiaController } from './modules/Panaderia/panaderia.controller';
import { PanaderiaService } from './modules/Panaderia/panaderia.service';
import { AuthService } from './modules/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersController } from './modules/users/users.controller';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
        synchronize: false,
      }),
    }),
    UsersModule, 
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule { }