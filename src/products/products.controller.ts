import { 
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete 
} from "@nestjs/common";

import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number
  ) {
    const generatedId = await this.productsService.addProduct(prodTitle, prodDescription, prodPrice)
    return { id: generatedId }
  }

  @Get()
  async getAllProducts() {
    return this.productsService.getAllProducts()
  }

  @Get(':id')
  async getProduct(@Param('id') productId: string) {
    return this.productsService.getSingleProduct(productId)
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number
  ) {
    await this.productsService.updateProduct(prodId, prodTitle, prodDescription, prodPrice)
    return null
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.removeProduct(prodId)
    return null
  }
}