import { Module } from '@nestjs/common';
import { ChestService } from './chest.service';
import { ChestController } from './chest.controller';

@Module({
  controllers: [ChestController],
  providers: [ChestService]
})
export class ChestModule {}
