import { ApiProperty } from '@nestjs/swagger';
import { OrderDetails } from '../../orderDetails/entities/orderDetails.entity';
import { User } from '../../users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @ApiProperty({
    description: 'UUID v4 generado automaticamente por la DDBB',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Fecha en formato DD/MM/YYYY',
    example: '14/08/2025',
  })
  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => OrderDetails, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetails;
}
