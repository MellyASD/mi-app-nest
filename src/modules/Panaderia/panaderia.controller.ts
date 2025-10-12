import {Controller,Get,Post,Patch,Delete,Param,Body,} from '@nestjs/common';
import { PanaderiaService } from './panaderia.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';
 //* Swagger tag for grouping endpoints in the documentation */ and controller definition
@ApiTags('Panaderia')
@Controller('panaderia')

@Controller('panaderia') // Ruta base del controlador
export class PanaderiaController {
  constructor(private readonly panaderiaService: PanaderiaService) {} // Inyecta el servicio

  // Productos por nombre and combos por número

  @Get('products') 
  listProducts() {
    return this.panaderiaService.listProducts();
  }

  @Get('products/:name') 
  getProductByName(@Param('name') name: string) {
    return this.panaderiaService.findProductByName(name);
  }

  @Post('products') 
  createProduct(@Body() dto: CreateProductDto) {
    return this.panaderiaService.createProduct(dto);
  }

  @Patch('products/:name')
  updateProductByName(
    @Param('name') name: string,
    @Body() dto: Partial<CreateProductDto>,
  ) {
    return this.panaderiaService.updateProductByName(name, dto);
  }

  @Delete('products/:name') 
  removeProductByName(@Param('name') name: string) {
    return this.panaderiaService.removeProductByName(name);
  }

  //  Combos por número

  @Get('combos') 
  listCombos() {
    return this.panaderiaService.listCombos();
  }

  @Get('combos/:number') 
  getComboByNumber(@Param('number') number: number) { 
    return this.panaderiaService.findComboByNumber(number);
  }
//* Nuevo endpoint para precio total
  @Get('combos/:number/total') 
  getComboWithTotal(@Param('number') number: number) {
    return this.panaderiaService.getComboWithTotalPrice(number);
}

  @Post('combos') 
  createCombo(@Body() dto: { name: string; items: string[] }) {
    return this.panaderiaService.createCombo(dto);
  }

  @Patch('combos/:number') 
  updateComboByNumber(
    @Param('number') number: number,
    @Body() dto: Partial<{ name: string; items: string[] }>,
  ) {
    return this.panaderiaService.updateComboByNumber(number, dto);
  }

  @Delete('combos/:number') 
  removeComboByNumber(@Param('number') number: number) {
    return this.panaderiaService.removeComboByNumber(number);
  }
}

