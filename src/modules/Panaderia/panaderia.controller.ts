import {Controller,Get,Post,Patch,Delete,Param,Body,} from '@nestjs/common';
import { PanaderiaService } from './panaderia.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Panaderia')
@Controller('panaderia')

@Controller('panaderia') // Ruta base del controlador
export class PanaderiaController {
  constructor(private readonly panaderiaService: PanaderiaService) {} // Inyecta el servicio

  // 🥐 Productos por nombre

  @Get('products') // Lista todos los productos
  listProducts() {
    return this.panaderiaService.listProducts();
  }

  @Get('products/:name') // Obtiene un producto por nombre
  getProductByName(@Param('name') name: string) {
    return this.panaderiaService.findProductByName(name);
  }

  @Post('products') // Crea un producto
  createProduct(@Body() dto: CreateProductDto) {
    return this.panaderiaService.createProduct(dto);
  }

  @Patch('products/:name')// Actualiza un producto por nombre
  updateProductByName(
    @Param('name') name: string,
    @Body() dto: Partial<CreateProductDto>,
  ) {
    return this.panaderiaService.updateProductByName(name, dto);
  }

  @Delete('products/:name') // Elimina un producto por nombre
  removeProductByName(@Param('name') name: string) {
    return this.panaderiaService.removeProductByName(name);
  }

  // 🍽️ Combos por número

  @Get('combos') // Lista todos los combos
  listCombos() {
    return this.panaderiaService.listCombos();
  }

  @Get('combos/:number') // Número es un entero
  getComboByNumber(@Param('number') number: number) { // Nuevo endpoint
    return this.panaderiaService.findComboByNumber(number);
  }

  @Get('combos/:number/total') // Nuevo endpoint para precio total
  getComboWithTotal(@Param('number') number: number) {
    return this.panaderiaService.getComboWithTotalPrice(number);
}

  @Post('combos') // Crea un combo
  createCombo(@Body() dto: { name: string; items: string[] }) {
    return this.panaderiaService.createCombo(dto);
  }

  @Patch('combos/:number') // Actualiza un combo
  updateComboByNumber(
    @Param('number') number: number,
    @Body() dto: Partial<{ name: string; items: string[] }>,
  ) {
    return this.panaderiaService.updateComboByNumber(number, dto);
  }

  @Delete('combos/:number') // Elimina un combo
  removeComboByNumber(@Param('number') number: number) {
    return this.panaderiaService.removeComboByNumber(number);
  }
}

