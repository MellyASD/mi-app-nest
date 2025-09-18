import { Controller, Get, Param } from '@nestjs/common'; // Importa el decorador Controller y Get de NestJS
import { UsersService } from './users.service'; // Importa el servicio UsersService

@Controller('users')// Define el controlador con la ruta base 'users'
export class UsersController {// Define la clase UsersController
    constructor (private readonly usersService: UsersService) {}// Inyecta el servicio UsersService mediante el constructor

    @Get()// Define el manejador para la ruta GET /users
    findAll() {// Método para obtener todos los usuarios
        return this.usersService.findAll();// Llama al método findAll del servicio UsersService
    }
    @Get(':id') // Define el manejador para la ruta GET /users/:id
    findOne(@Param('id') id: string) {// Método para obtener un usuario por su ID
        return this.usersService.findOne(Number(id));// Llama al método findOne del servicio UsersService
    }

}

