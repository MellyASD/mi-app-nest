import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common'; // Import the necessary decorators from NestJS
import { IUser, UsersService } from './users.service'; // Importa el servicio UsersService

@Controller('users')// Define the controller with the base route 'users'
export class UsersController {// Define the UsersController class
    constructor (private readonly usersService: UsersService) {}// Inject the UsersService via the constructor

    @Get()// Define the handler for the GET /users route
    findAll() {// MMethod to get all users
        return this.usersService.findAll();// Call the findAll method from the UsersService
    }
    @Get(':id') // Define the handler for the GET /users/:id route
    findOne(@Param('id') id: string) {// MMethod to get a user by their ID
        return this.usersService.findOne(Number(id));// Call the findOne method from the UsersService
    }

    @Post() // Define the handler for the POST /users route
    create(@Body() body: Omit<IUser, 'id'>) {// MMethod to create a new user
        return this.usersService.create(body);// Call the create method from the UsersService
    }

    @Put(':id') // Define the handler for the PUT /users/:id route  
    update(@Param('id') id: string, @Body() body: Omit<IUser, 'id'>) {// Method to update an existing user
        return this.usersService.update(Number(id), body);
    } // Call the update method from the UsersService

    @Delete(':id') // Define the handler for the DELETE /users/:id route
    remove(@Param('id') id: string) {
        return this.usersService.remove(Number(id));
    }
}