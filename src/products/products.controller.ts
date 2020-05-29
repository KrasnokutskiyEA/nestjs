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
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number
  ) {
    const generatedId = this.productsService.addProduct(prodTitle, prodDescription, prodPrice)
    return {
      id: generatedId
    }
  }

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts()
  }

  @Get(':id')
  getProduct(@Param('id') productId: string) {
    return this.productsService.getSingleProduct(productId)
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number
  ) {
    this.productsService.updateProduct(prodId, prodTitle, prodDescription, prodPrice)
    return null
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    this.productsService.removeProduct(prodId)
    return null
  }
}