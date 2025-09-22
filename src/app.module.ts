import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ChestModule } from './modules/chest-re2/chest.module';
import { ChestController } from './modules/chest-re2/chest.controller';
import { ChestService } from './modules/chest-re2/chest.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, ChestModule],
  controllers: [AppController, ChestController],
  providers: [AppService, ChestService]
})
export class AppModule {}
