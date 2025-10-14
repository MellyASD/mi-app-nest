import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
//* DTO for creating a new product in the bakery */
export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Nombre del producto' })
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Precio del producto' })
  price!: number;
}