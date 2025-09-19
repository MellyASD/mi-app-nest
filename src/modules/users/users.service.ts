import { Injectable, NotFoundException } from '@nestjs/common';// Import the decorator Injectable and NotFoundException from NestJS
export type IUser = { id: number, name: string, email: string };// Define the IUser type

@Injectable()// Define the class as an injectable service
export class UsersService {
    // Removed duplicate remove method implementation.

    private users: IUser[] = [// private array of users
        { id: 1, name: 'paolar', email: 'paolar@correo.com' },// User 1
        { id: 2, name: 'homero simpson', email: 'homerojs@gmail.com' },// User 2
        { id: 3, name: 'andres', email: 'andres@hotmail.com' }// User 3
    ]

    findAll(): IUser[] {// MMethod to get all users
        return this.users;// Return the array of users
    }
    findOne(id: number): IUser | undefined {// method to get a user by their ID
        const userFind = this.users.find((user) => user.id === id);// Find the user by ID
        if (!userFind) throw new NotFoundException  (`User with id ${id} not found`); // Throw an exception if the user is not found
        return userFind; // Return the found user
    }
    
    create (user:  Omit<IUser, 'id'>): IUser { // Method to create a new user
        const newId = this.users.length > 0 //
            ? this.users[this.users.length - 1].id + 1 // Get the last user's ID and increment it
            : 1;

        const newUser: IUser = { id: newId, ...user }; // Create the new user object
        this.users.push(newUser); // Add the new user to the array
        return newUser; // Return the newly created user
    }
    update(id: number, newUser: Omit<IUser, 'id'>): IUser { // Method to update an existing user
        const user = this.findOne(id) as IUser; // Find the user by ID (guaranteed by exception)
        Object.assign(user, newUser); // Update the user object with the new data
        return user; // Return the updated user
    }
    remove(id: number): { deleted: boolean } {// Method to delete a user by their ID
        const user = this.users.find(user => user.id === id);// Find the user by ID
        if (!user) {// If the user is not found
            throw new NotFoundException(`User with id ${id} not found`);// Throw a NotFoundException
        }
        this.users.splice(this.users.indexOf(user), 1);// Remove the user from the array
        return { deleted: true };// Return an object indicating successful deletion
    }
}