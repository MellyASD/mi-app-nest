import { IsArray, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
//* DTO for creating a combo with product IDs */
export class CreateComboDto {
  @ApiProperty({ type: [Number], description: 'IDs de productos que forman el combo' })
  @IsArray()
  @IsInt({ each: true })
  products!: number[];
}