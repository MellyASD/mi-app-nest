import { Module } from '@nestjs/common';
import { ChestService } from './chest.service';
import { ChestController } from './chest.controller';
 //* Module definition for the Chest feature, including controller and service
@Module({
  controllers: [ChestController],
  providers: [ChestService]
})
export class ChestModule {}
