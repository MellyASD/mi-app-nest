import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//* Enum for user roles */
export enum RolesEnum {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ default: 'cliente' })
  role!: string;
}