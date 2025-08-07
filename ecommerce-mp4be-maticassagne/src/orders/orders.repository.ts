import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/orderDetails/entities/orderDetails.entity';
import { Product } from 'src/products/entities/products.entity';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { Order } from './entities/orders.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
  ) {}

  async getOrder(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });
    if (!order) {
      throw new NotFoundException(`Orden con id ${id} no encontrada`);
    }
    return order;
  }

  async addOrder(userId: string, products: any) {
    let total = 0;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no encontrado.`);
    }
    //Crear orden
    const order = new Order();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.orderRepository.save(order);

    //Asociar id con product
    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productRepository.findOneBy({
          id: element.id,
        });
        if (!product) {
          throw new NotFoundException('Producto no encontrado');
        }
        //Calculo total
        total += Number(product.price);
        //Actualizar stock
        await this.productRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );
    const orderDetail = new OrderDetails();

    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;
    await this.orderDetailsRepository.save(orderDetail);

    return await this.orderRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }
}
