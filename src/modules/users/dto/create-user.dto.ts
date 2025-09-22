import { IsEmail, IsNotEmpty, IsString, IsInt, Min } from 'class-validator'; // Importa los validadores necesarios

// Define la clase CreateUserDto con reglas de validación
export class CreateUserDto { // Clase para crear un nuevo usuario
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  @Min(19, { message: 'La edad debe ser mayor de 18 años' })
  age: number;
}