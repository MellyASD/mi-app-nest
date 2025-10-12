import { Module } from '@nestjs/common';
import { ChestService } from './chest.service';
import { ChestController } from './chest.controller';
import { ApiTags } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../../entities/item.entity';
@ApiTags('chest')
 //* Module definition for the Chest feature, including controller and service
@Module({
  imports: [TypeOrmModule.forFeature([Item])], //* Register the Item entity with TypeORM
  controllers: [ChestController],
  providers: [ChestService]
})
export class ChestModule {}
