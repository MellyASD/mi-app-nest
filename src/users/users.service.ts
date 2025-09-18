import { Injectable, NotFoundException } from '@nestjs/common';// Importa el decorador Injectable y NotFoundException de NestJS
export type IUser = { id: number, name: string, email: string };// Define el tipo IUser

@Injectable()// Define la clase como un servicio inyectable
export class UsersService {// Define la clase UsersService

    private users: IUser[] = [// Array privado de usuarios
        { id: 1, name: 'Alice', email: 'alice@example.com' },// Usuario 1
        { id: 2, name: 'Bob', email: 'bob@example.com' },// Usuario 2
        { id: 3, name: 'Charlie', email: 'charlie@example.com' }// Usuario 3
    ]
    
    findAll(): IUser[] {// Método para obtener todos los usuarios
        return this.users;// Devuelve el array de usuarios
    }
    findOne(id: number): IUser | undefined {// Método para obtener un usuario por su ID
        const userFind = this.users.find((user) => user.id === id);// Busca el usuario por ID
        if (!userFind) throw new NotFoundException  (`User with id ${id} not found`); // Lanza una excepción si no se encuentra el usuario
        return userFind; // Devuelve el usuario encontrado
    } 
    
    
    ;
}
