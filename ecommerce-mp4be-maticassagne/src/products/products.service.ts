import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  getProducts(page: number, limit: number) {
    return this.productsRepository.getAllProducts(page, limit);
  }

  getProductsById(id: string) {
    return this.productsRepository.getProductById(id);
  }

  addProduct() {
    return this.productsRepository.addProduct();
  }

  createProduct(product: any) {
    return this.productsRepository.newProduct(product);
  }

  updateProduct(id: string, product: any) {
    return this.productsRepository.updateProduct(id, product);
  }

  deleteProduc(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}
