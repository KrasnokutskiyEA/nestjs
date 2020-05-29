import { Injectable, NotFoundException } from "@nestjs/common"
import { Product } from './product.model'

@Injectable()
export class ProductsService {
  private products: Product[] = []

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id)
    const product = this.products[productIndex]
    if (!product) {
      throw new NotFoundException('Could not find product')
    }
    return [product, productIndex]
  }

  addProduct(title: string, description: string, price: number) {
    const prodId = Math.random().toString()
    const newProduct = new Product(prodId, title, description, price)
    this.products.push(newProduct) 
    return prodId
  }

  getAllProducts() {
    return [ ...this.products ]
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0]
    return { ...product }
  }

  updateProduct(productId: string, title: string, description: string, price: number) {
    const [product, index] = this.findProduct(productId)
    const updatedProduct = {...product}

    title && (updatedProduct.title = title)
    description && (updatedProduct.description = description)
    price && (updatedProduct.price = price)

    this.products[index] = updatedProduct
  }

  removeProduct(prodId: string) {
    const index = this.findProduct(prodId)[1]
    this.products.splice(index, 1)
  }
}