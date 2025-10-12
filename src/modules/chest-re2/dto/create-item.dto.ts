import { IsNotEmpty, IsString, IsInt, Min, IsOptional } from 'class-validator'; // Importa los decoradores necesarios desde class-validator
import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class CreateItemDto { // Define la clase CreateItemDto
  
  //* DEcorators to validate the properties of the DTO and to generate API documentation via Swagger
  
  @IsNotEmpty() 
  @IsString() 
  @ApiProperty({ description: 'Nombre del ítem' }) 
  name!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Tipo del ítem' }) 
  type!: string;

  @IsInt() 
  @Min(1) 
  @ApiProperty({ description: 'Cantidad del ítem' }) 
  quantity!: number;

//* New property to indictate if the character is restricted to Leon or Claire

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Personaje al que está restringido el ítem' }) 
  restrictedTo?: 'Leon' | 'Claire'; 
}