import { IsNotEmpty, IsString, IsInt, Min, IsOptional } from 'class-validator'; // Importa los decoradores necesarios desde class-validator
import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class CreateItemDto { // Define la clase CreateItemDto
  @IsNotEmpty() // El decorador IsNotEmpty asegura que el campo no esté vacío
  @IsString() // El decorador IsString asegura que el campo sea una cadena de texto
  @ApiProperty({ description: 'Nombre del ítem' }) // Agrega la propiedad de Swagger
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Tipo del ítem' }) // Agrega la propiedad de Swagger
  type: string;

  @IsInt() // El decorador IsInt asegura que el campo sea un número entero  
  @Min(1) // El decorador Min asegura que el valor mínimo sea 1
  @ApiProperty({ description: 'Cantidad del ítem' }) // Agrega la propiedad de Swagger
  quantity: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Personaje al que está restringido el ítem' }) // Agrega la propiedad de Swagger
  restrictedTo?: 'Leon' | 'Claire'; // Propiedad opcional para restringir el ítem a un personaje específico
}