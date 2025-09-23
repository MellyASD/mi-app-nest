import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ChestModule } from './modules/chest-re2/chest.module';
import { ChestController } from './modules/chest-re2/chest.controller';
import { ChestService } from './modules/chest-re2/chest.service';
import { PanaderiaModule } from './modules/Panaderia/panaderia.module';
import { PanaderiaController } from './modules/Panaderia/panaderia.controller';
import { PanaderiaService } from './modules/Panaderia/panaderia.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, ChestModule, PanaderiaModule],
  controllers: [AppController, ChestController, PanaderiaController],
  providers: [AppService, ChestService, PanaderiaService]
})
export class AppModule {}
