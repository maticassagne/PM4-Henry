import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import { Product } from 'src/products/entities/products.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrderRepository) {}

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }

  addOrder(userId: string, product: Partial<Product>[]) {
    return this.ordersRepository.addOrder(userId, product);
  }
}
