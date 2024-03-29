import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    health() {
        return {
            success: true,
            message: 'API running!',
        }
    }
}
