import { Order } from 'src/orders/entities/orders.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  password: string;

  @Column('int')
  phone?: number;

  @Column({ type: 'varchar', length: 50 })
  country?: string;

  @Column('text')
  address?: string;

  @Column({ type: 'varchar', length: 50 })
  city?: string;

  @OneToMany(() => Order, (orders) => orders.user)
  @JoinColumn({ name: 'orders_id' })
  orders: Order[];

  @Column({ default: false })
  isAdmin: boolean;
}
