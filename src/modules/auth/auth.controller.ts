import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/dto/login.dto';
//* Swagger tag for grouping endpoints in the documentation and controller definition and controller definition
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() data: LoginDTO) {
        return this.authService.login(data);
    }
}