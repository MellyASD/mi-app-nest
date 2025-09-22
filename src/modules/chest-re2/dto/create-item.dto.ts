import { IsNotEmpty, IsString, IsInt, Min, IsOptional } from 'class-validator'; // Importa los decoradores necesarios desde class-validator

export class CreateItemDto { // Define la clase CreateItemDto
  @IsNotEmpty() // El decorador IsNotEmpty asegura que el campo no esté vacío
  @IsString() // El decorador IsString asegura que el campo sea una cadena de texto
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsInt() // El decorador IsInt asegura que el campo sea un número entero  
  @Min(1) // El decorador Min asegura que el valor mínimo sea 1
  quantity: number;

  @IsOptional()
  @IsString()
  restrictedTo?: 'Leon' | 'Claire'; // Propiedad opcional para restringir el ítem a un personaje específico
}