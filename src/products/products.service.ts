import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel} from "@nestjs/mongoose"
import { Model } from 'mongoose'
import { Product } from './product.model'

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  private async findProduct(id: string): Promise<Product> {
    let product
    try {
      product = await this.productModel.findById(id).exec()
    } catch (e) {
      throw new NotFoundException('Could not find product')
    }
    if (!product) {
      throw new NotFoundException('Could not find product')
    }
    return product
  }

  async addProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({ title, description, price })
    const result = await newProduct.save() // save() - mongoose method
    return result.id as string
  }

  async getAllProducts() {
    const products = await this.productModel.find().exec()
    return products.map(prod => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price
    })) as Product[]
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId)
    return { 
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price
    }
  }


  async updateProduct(productId: string, title: string, description: string, price: number) {
    const updatedProduct = await this.findProduct(productId)
  
    title && (updatedProduct.title = title)
    description && (updatedProduct.description = description)
    price && (updatedProduct.price = price)

    updatedProduct.save()
  }

  async removeProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec()
    if (result.n === 0) {
      throw new NotFoundException('Could not find product') 
    }
  }
}