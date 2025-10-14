import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './role.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column()
  value!: number;

  @Column({ nullable: true })
  quantity!: number;

  @Column({ nullable: true })
  restrictedTo!: string;

@ManyToMany(() => require('./role.entity').Role, role => role.items)
@JoinTable()
roles!: Role[];
}