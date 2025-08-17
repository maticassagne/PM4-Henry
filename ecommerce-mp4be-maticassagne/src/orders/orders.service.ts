import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import { Product } from '../products/entities/products.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrderRepository) {}

  async getOrder(id: string) {
    return await this.ordersRepository.getOrder(id);
  }

  async addOrder(userId: string, product: Partial<Product>[]) {
    return this.ordersRepository.addOrder(userId, product);
  }
}
