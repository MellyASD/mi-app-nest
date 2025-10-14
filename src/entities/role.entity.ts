import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Item } from './item.entity';
//* Entity representing a role that can be associated with items
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id!: number;

  @Column()
  @ApiProperty()
  name!: string;
//* Many-to-many relationship with Item entity */
  @ManyToMany(() => Item, item => item.roles)
  @ApiProperty({ type: () => [Item] })
  items!: Item[];
}
