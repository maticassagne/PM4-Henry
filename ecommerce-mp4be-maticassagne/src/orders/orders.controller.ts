import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { ParamsWithIdDto } from 'src/common/dto/idParams.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    return this.ordersService.addOrder(userId, products);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getOrder(@Param() { id }: ParamsWithIdDto) {
    return this.ordersService.getOrder(id);
  }
}
