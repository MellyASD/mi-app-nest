import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@entities/product.entity';

export class ComboResponseDto {
  @ApiProperty({ description: 'ID del combo' })
  id!: number;

  @ApiProperty({ description: 'Nombre del combo' })
  name!: string;

  @ApiProperty({ description: 'Productos incluidos en el combo', type: [Product] })
 products!: Product[];

  @ApiProperty({ description: 'Precio total del combo' })
  price!: number;
}