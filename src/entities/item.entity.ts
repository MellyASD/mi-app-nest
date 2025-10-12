import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID autogenerado del ítem' })
  id!: number;

  @Column()
  @ApiProperty({ description: 'Nombre del ítem' })
  name!: string;

  @Column()
  @ApiProperty({ description: 'Tipo del ítem (weapon, healing, explosive)' })
  type!: string;

  @Column()
  @ApiProperty({ description: 'Cantidad del ítem' })
  quantity!: number;

  @Column({ nullable: true })
  @ApiPropertyOptional({ description: 'Personaje al que está restringido el ítem (Leon o Claire)' })
  restrictedTo?: string;
}