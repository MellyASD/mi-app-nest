import { Entity, Column, PrimaryGeneratedColumn,  } from 'typeorm';

//* Enum for user roles */
export type Roles = 'User' | 'Admin';
//export enum RolesEnum {

 // User = 'User',
 // Admin = 'Admin'
//}

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

  @Column({ default: 'user' })
  role!: Roles;
}