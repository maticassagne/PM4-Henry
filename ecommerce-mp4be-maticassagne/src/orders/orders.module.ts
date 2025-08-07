import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './orders.repository';
import { Order } from './entities/orders.entity';
import { Product } from 'src/products/entities/products.entity';
import { User } from 'src/users/entities/users.entity';
import { OrderDetails } from 'src/orderDetails/entities/orderDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, User, OrderDetails])],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
