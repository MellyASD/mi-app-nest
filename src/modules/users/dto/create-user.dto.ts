import { IsEmail, IsNotEmpty, IsString, IsInt, Min } from 'class-validator'; // Importa los validadores necesarios

// Define la clase CreateUserDto con reglas de validación
export class CreateUserDto { // Clase para crear un nuevo usuario
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt() // Asegura que el campo sea un número entero
  @Min(0, { message: 'La edad no puede ser negativa' })
  @Min(18, { message: 'La edad debe ser mayor de 18 años' })// Asegura que la edad mínima sea 18
  age: number;
}