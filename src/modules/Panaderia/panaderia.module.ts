import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PanaderiaService } from './panaderia.service';
import { PanaderiaController } from './panaderia.controller';
import { Product } from '@entities/product.entity';
import { Combo } from '@entities/combo.entity';
//* Entities for the Panaderia feature */
@Module({
  imports: [TypeOrmModule.forFeature([Product, Combo])],
  providers: [PanaderiaService],
  controllers: [PanaderiaController],
})
export class PanaderiaModule {}
// Module for the Panaderia feature, including service and controller