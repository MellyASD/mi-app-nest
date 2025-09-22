import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class CreateComboDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  items: number[]; // IDs de productos
}
