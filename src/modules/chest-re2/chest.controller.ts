import {Controller,Get,Post,Patch,Delete,Param,Body,ParseIntPipe
} from '@nestjs/common'; // Import necessary decorators and pipes from NestJS
import { ChestService } from './chest.service'; // Import the ChestService to handle business logic
import { CreateItemDto } from './dto/create-item.dto'; // Import DTO for creating items
import { UpdateItemDto } from './dto/update-item.dto'; // Import DTO for updating items
import { IItem } from './item.model'; // Import the IItem interface
import type { ICharacter } from './item.model'; // Import the ICharacter type
import { ApiTags } from '@nestjs/swagger';

@ApiTags('chest')
@Controller('chest')
export class ChestController {
  constructor(private readonly chestService: ChestService) {}

  @Get(':character') // Define a GET endpoint that takes a character parameter
  findAll(@Param('character') character: ICharacter) {
    return this.chestService.findAll(character);
  }

  @Post() // Define a POST endpoint to create a new item
  create(@Body() createItemDto: CreateItemDto) {
    return this.chestService.create(createItemDto);
  }

  @Post('combine-herbs')
  combine() {
    return this.chestService.combineHerbs();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { // Use ParseIntPipe to ensure id is a number
    return this.chestService.remove(id);
  }
}
