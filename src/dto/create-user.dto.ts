import { IsEmail, IsInt, IsNotEmpty, IsOptional, MaxLength, Min, MinLength,Matches } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    //@MinLength(6)
    //@MaxLength(10)
    password: string;
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,10}$/, {
      message:
        'La contraseña debe tener entre 6 y 10 caracteres, incluir al menos una mayúscula, una minúscula, un número y un carácter especial',
    })
    @IsOptional()
    @IsInt()
    @Min(0,{ message: "La edad debe ser mayor o igual a 0" })
    age?: number;
}