import {Controller,Get,Post,Patch,Delete,Param,Body,ParseIntPipe,} from '@nestjs/common';
import { PanaderiaService } from './panaderia.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateComboDto } from './dto/create-combo.dto';

@Controller('panaderia')
export class PanaderiaController {
  constructor(private readonly panaderiaService: PanaderiaService) {}

  // 🥐 Productos

  @Get('products')
  listProducts() {
    return this.panaderiaService.listProducts();
  }

  @Get('products/:id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.panaderiaService.findProduct(id);
  }

  @Post('products')
  createProduct(@Body() dto: CreateProductDto) {
    return this.panaderiaService.createProduct(dto);
  }

  @Patch('products/:id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateProductDto>,
  ) {
    return this.panaderiaService.updateProduct(id, dto);
  }

  @Delete('products/:id')
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.panaderiaService.removeProduct(id);
  }

  // 🍽️ Combos

  @Get('combos')
  listCombos() {
    return this.panaderiaService.listCombos();
  }

  @Get('combos/:id')
  getCombo(@Param('id', ParseIntPipe) id: number) {
    return this.panaderiaService.findCombo(id);
  }

  @Post('combos')
  createCombo(@Body() dto: CreateComboDto) {
    return this.panaderiaService.createCombo(dto);
  }

  @Patch('combos/:id')
  updateCombo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateComboDto>,
  ) {
    return this.panaderiaService.updateCombo(id, dto);
  }

  @Delete('combos/:id')
  removeCombo(@Param('id', ParseIntPipe) id: number) {
    return this.panaderiaService.removeCombo(id);
  }
}
