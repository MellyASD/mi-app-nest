import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty, IsInt } from 'class-validator'; // Importa validadores

export class CreateComboDto { // DTO para crear combos
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()// Asegura que es un array
  @ArrayNotEmpty()
  @IsInt({ each: true })// Asegura que cada elemento es un entero
  items: number[]; // IDs de productos
}
