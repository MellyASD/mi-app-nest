import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
//* Entity representing a product in the bakery
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID del producto' })
  id!: number;

  @Column()
  @ApiProperty({ description: 'Nombre del producto' })
  name!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({ description: 'Precio del producto' })
  price!: number;
}