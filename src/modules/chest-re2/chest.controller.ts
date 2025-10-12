import {Controller,Get,Post,Patch,Delete,Param,Body,ParseIntPipe
} from '@nestjs/common'; 
import { ChestService } from './chest.service'; 
import { CreateItemDto } from './dto/create-item.dto'; 
import { UpdateItemDto } from './dto/update-item.dto'; 
import { IItem } from './item.model'; 
import type { ICharacter } from './item.model'; 
import { ApiTags } from '@nestjs/swagger';

//* Swagger tag for grouping endpoints in the documentation and controller definition
@ApiTags('chest')
@Controller('chest')
export class ChestController {
  constructor(private readonly chestService: ChestService) {}

  //* Endpoint to retrieve all items for a specific character
  @Get(':character') 
  findAll(@Param('character') character: ICharacter) {
    return this.chestService.findAll(character);
  }
//* Endpoint to create a new item
  @Post() 
  create(@Body() createItemDto: CreateItemDto) {
    return this.chestService.create(createItemDto);
  }
//* Endpoint to update an existing item by its ID and the updated data
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateItemDto: UpdateItemDto) {
    return this.chestService.update(id, updateItemDto);
  }
//* Endpoint to delete an item by its ID ensureing the ID is an integer
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { 
    return this.chestService.remove(id);
  }
}
