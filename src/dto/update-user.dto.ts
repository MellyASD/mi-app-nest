import { IsEmail, IsInt, IsIn, IsNotEmpty, IsOptional, Length, Max, Min } from 'class-validator';

export type Roles = 'User' | 'Admin';

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsIn(['User', 'Admin'], { message: 'El rol debe ser User o Admin' })
  role!: Roles;

  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Debe ser un correo válido' })
  email?: string;

  @IsOptional()
  @Length(6, 10, { message: 'La contraseña debe tener entre 6 y 10 caracteres' })
  password?: string;

  @IsOptional()
  @IsInt()
  @Min(18, { message: 'La edad debe ser mayor o igual a 18' })
  @Max(100, { message: 'Sea realista' })
  age?: number;
}