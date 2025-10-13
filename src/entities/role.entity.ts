import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Item } from './item.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id!: number;

  @Column()
  @ApiProperty()
  name!: string;

  @ManyToMany(() => Item, item => item.roles)
  @ApiProperty({ type: () => [Item] })
  items!: Item[];
}
