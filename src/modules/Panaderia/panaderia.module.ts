import { Module } from '@nestjs/common';
import { PanaderiaService } from './panaderia.service';
import { PanaderiaController } from './panaderia.controller';

@Module({
  controllers: [PanaderiaController],
  providers: [PanaderiaService],
})
export class PanaderiaModule {}