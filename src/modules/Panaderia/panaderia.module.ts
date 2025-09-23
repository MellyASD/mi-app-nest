import { Module } from '@nestjs/common';
import { PanaderiaService } from './panaderia.service'; // Importa el servicio
import { PanaderiaController } from './panaderia.controller';// Importa el controlador

@Module({ // Define el módulo
  controllers: [PanaderiaController],
  providers: [PanaderiaService],
})
export class PanaderiaModule {}