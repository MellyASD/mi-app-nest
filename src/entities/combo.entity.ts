import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.entity';

//* Entity representing a combo of products in the bakery
@Entity()
export class Combo {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID del combo' })
  id!: number;

  @Column()
  @ApiProperty({ description: 'Nombre del combo' })
  name!: string;
//* Many-to-many relationship with Product entity
  @ManyToMany(() => Product)
  @JoinTable()
  @ApiProperty({ description: 'Lista de productos incluidos en el combo' })
  products!: Product[];

  @ApiProperty({ description: 'Precio del combo' })
  price!: number;
}