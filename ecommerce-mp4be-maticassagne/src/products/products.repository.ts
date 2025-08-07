import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/categories.entity';
import * as data from '../helpers/data.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getAllProducts(page: number, limit: number) {
    let products = await this.productsRepository.find({
      relations: { category: true },
    });
    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);
    return products;
  }

  async getProductById(id: string) {
    const foundProduct = await this.productsRepository.findOneBy({ id });
    if (!foundProduct) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }
    return foundProduct;
  }

  async newProduct(product: any) {}

  async addProduct() {
    const categories = await this.categoriesRepository.find();
    await Promise.all(
      data.map(async (element) => {
        const category = categories.find(
          (category) => category.name === element.category,
        );
        if (!category)
          throw new NotFoundException(
            `La categoria ${element.category} no existe`,
          );
        const product = new Product();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.category = category;
        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Product)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      }),
    );
    return 'Productos agregados exitosamente';
  }

  async updateProduct(id: string, product: any) {
    await this.productsRepository.update(id, product);
    const updatedProduct = await this.productsRepository.findOneBy({ id });
    return updatedProduct;
  }

  async deleteProduct(id: string) {
    const foundProduct = await this.productsRepository.findOneBy({ id });
    if (!foundProduct) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    await this.productsRepository.delete(foundProduct);
    return `Producto con id ${id} eliminado exitosamente`;
  }
}
