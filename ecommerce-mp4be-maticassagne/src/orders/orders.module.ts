import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './orders.repository';
import { Order } from './entities/orders.entity';
import { Product } from '../products/entities/products.entity';
import { User } from '../users/entities/users.entity';
import { OrderDetails } from '../orderDetails/entities/orderDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, User, OrderDetails])],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
