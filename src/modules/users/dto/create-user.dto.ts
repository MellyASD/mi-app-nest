import { IsEmail, IsInt, IsNotEmpty, Length, Max, Min } from 'class-validator';
import { Roles } from 'src/entities/user.entity';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  role!: Roles;

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name!: string;

  @IsNotEmpty({ message: 'El correo es obligatorio' })
  @IsEmail({}, { message: 'Debe ser un correo válido' })
  email!: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @Length(6, 10, {
    message: 'La contraseña debe tener entre 6 y 10 caracteres',
  })
  password!: string;

  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(18, { message: 'La edad debe ser mayor o igual a 18' })
  @Max(100, { message: 'Sea realista' })
  age!: number;
}