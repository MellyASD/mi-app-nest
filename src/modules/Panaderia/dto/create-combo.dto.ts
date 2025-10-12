import { IsArray, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComboDto {
  @ApiProperty({ type: [Number], description: 'IDs de productos que forman el combo' })
  @IsArray()
  @IsInt({ each: true })
  products!: number[];
}