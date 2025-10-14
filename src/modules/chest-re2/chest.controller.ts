import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ChestService } from './chest.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
//* Controller for managing chest items, including CRUD operations and herb combination */
@ApiTags('Chest')
@Controller('chest')
export class ChestController {
  constructor(private readonly chestService: ChestService) {}
//* Get all items available for a specific character */
  @Get()
  @ApiQuery({ name: 'character', enum: ['Leon', 'Claire'], required: true })
  @ApiResponse({ status: 200, description: 'Lista de ítems disponibles para el personaje' })
  async findAll(@Query('character') character: 'Leon' | 'Claire') {
    return this.chestService.findAll(character);
  }
  //* Get all items in the chest, regardless of character restriction */
@Get('all')
@ApiResponse({ status: 200, description: 'Lista completa de ítems en el baúl' })
async findAllItems() {
  return this.chestService.findAllItems();
}
//* Get a single item by its ID */
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Ítem encontrado por ID' })
  async findOne(@Param('id') id: number) {
    return this.chestService.findOne(id);
  }
//* Create a new item in the chest */
  @Post()
  @ApiResponse({ status: 201, description: 'Ítem creado exitosamente' })
  async create(@Body() createItemDto: CreateItemDto) {
    return this.chestService.create(createItemDto);
  }
  //* Update an existing item by its ID */

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Ítem actualizado exitosamente' })
  async update(@Param('id') id: number, @Body() updateItemDto: UpdateItemDto) {
    return this.chestService.update(id, updateItemDto);
  }
//* Delete an item from the chest by its ID */
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Ítem eliminado exitosamente' })
  async remove(@Param('id') id: number) {
    return this.chestService.remove(id);
  }
//* Combine green and red herbs to create a mixed herb */
  @Post('combine')
  @ApiResponse({ status: 201, description: 'Hierba mixta creada exitosamente' })
  async combineHerbs() {
    return this.chestService.combineHerbs();
  }
}
