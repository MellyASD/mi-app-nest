import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from './role.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id!: number;

  @Column()
  @ApiProperty()
  name!: string;

  @Column()
  @ApiProperty()
  type!: string;

  @Column()
  @ApiProperty()
  value!: number;

  @ManyToMany(() => Role, role => role.items)
  @ApiProperty({ type: () => [Role] })
  @JoinTable()
  roles!: Role[];
}
