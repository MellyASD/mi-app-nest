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

@ApiTags('Chest')
@Controller('chest')
export class ChestController {
  constructor(private readonly chestService: ChestService) {}

  @Get()
  @ApiQuery({ name: 'character', enum: ['Leon', 'Claire'], required: true })
  @ApiResponse({ status: 200, description: 'Lista de ítems disponibles para el personaje' })
  async findAll(@Query('character') character: 'Leon' | 'Claire') {
    return this.chestService.findAll(character);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Ítem encontrado por ID' })
  async findOne(@Param('id') id: number) {
    return this.chestService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Ítem creado exitosamente' })
  async create(@Body() createItemDto: CreateItemDto) {
    return this.chestService.create(createItemDto);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Ítem actualizado exitosamente' })
  async update(@Param('id') id: number, @Body() updateItemDto: UpdateItemDto) {
    return this.chestService.update(id, updateItemDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Ítem eliminado exitosamente' })
  async remove(@Param('id') id: number) {
    return this.chestService.remove(id);
  }

  @Post('combine')
  @ApiResponse({ status: 201, description: 'Hierba mixta creada exitosamente' })
  async combineHerbs() {
    return this.chestService.combineHerbs();
  }
}
