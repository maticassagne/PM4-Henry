import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/createProduct.dto';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async getProducts(page: number, limit: number) {
    return await this.productsRepository.getAllProducts(page, limit);
  }

  async getProductsById(id: string) {
    return await this.productsRepository.getProductById(id);
  }

  async addProduct() {
    return await this.productsRepository.addProduct();
  }

  async createProduct(product: CreateProductDto) {
    return await this.productsRepository.newProduct(product);
  }

  async updateProduct(id: string, product: any) {
    return await this.productsRepository.updateProduct(id, product);
  }

  async deleteProduc(id: string) {
    return await this.productsRepository.deleteProduct(id);
  }
}
