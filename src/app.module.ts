import { Module } from '@nestjs/common';
import { AmazonModule } from './modules/amazon/amazon.module';
import { HealthModule } from './modules/health/health.module';

@Module({
    imports: [
        AmazonModule,
        HealthModule,
    ],
})
export class AppModule { }
