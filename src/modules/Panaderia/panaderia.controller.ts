import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PanaderiaService } from './panaderia.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateComboDto } from './dto/create-combo.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Product } from '@entities/product.entity';
import { Combo } from '@entities/combo.entity';

@ApiTags('Panadería')
@Controller('panaderia')
export class PanaderiaController {
  constructor(private readonly panaderiaService: PanaderiaService) {}

  // 🔹 Productos
  @Post('productos')
  @ApiResponse({ type: Product })
  createProducto(@Body() dto: CreateProductDto) {
    return this.panaderiaService.createProduct(dto);
  }

  @Get('productos')
  @ApiResponse({ type: [Product] })
  listProductos() {
    return this.panaderiaService.listProducts();
  }

  @Get('productos/:name')
  @ApiResponse({ type: Product })
  findProducto(@Param('name') name: string) {
    return this.panaderiaService.findProductByName(name);
  }

  @Put('productos/:name')
  @ApiResponse({ type: Product })
  updateProducto(@Param('name') name: string, @Body() dto: Partial<CreateProductDto>) {
    return this.panaderiaService.updateProductByName(name, dto);
  }

 @Delete('productos/:name')
@ApiResponse({ description: 'Producto eliminado correctamente', status: 200 })
removeProducto(@Param('name') name: string): Promise<{ deleted: boolean }> {
  return this.panaderiaService.removeProductByName(name);
}
}