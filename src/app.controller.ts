import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
//* Swagger tag for grouping endpoints in the documentation and controller definition
@ApiTags('App') 
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Root route: localhost:3000/
   * Returns a simple greeting message
   */
  @ApiOperation({ summary: 'Devuelve un saludo simple' })
  @ApiResponse({ status: 200, description: 'Hello World!' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * Status route: localhost:3000/status
   * Returns the backend status with timestamp
   */
  @ApiOperation({ summary: 'Returns the backend status' })
  @ApiResponse({
    status: 200,
    description: 'OK status with timestamp',
    schema: {
      example: {
        status: 'ok',
        time: '2025-10-11T19:34:00.000Z',
      },
    },
  })
  @Get('status')
  getStatus() {
    return this.appService.getStatus();
  }
}