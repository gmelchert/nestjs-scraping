import { Controller, Get, Query } from '@nestjs/common';
import { AmazonService } from './amazon.service';

@Controller('amazon')
export class AmazonController {
    constructor(private readonly amazonService: AmazonService) { }

    @Get('products')
    async listProducts(
        @Query('products') products: string
    ) {
        return this.amazonService.findAllProducts(products);
    }
}
