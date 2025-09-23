import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator'; // Importa validadores

export class CreateProductDto { // DTO para crear productos
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;
}