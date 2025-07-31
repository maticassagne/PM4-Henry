import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsRepository {
  private products = [
    {
      id: Number,
      name: String,
      description: String,
      price: Number,
      stock: Boolean,
      imgUrl: String,
    },
  ];

  async getProductsFromRepository() {
    return this.products;
  }
}
