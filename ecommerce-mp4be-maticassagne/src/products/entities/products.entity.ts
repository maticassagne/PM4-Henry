import { Category } from 'src/categories/entities/categories.entity';
import { OrderDetails } from 'src/orderDetails/entities/orderDetails.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({
    type: 'text',
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdD7G7FFg1UKZFXhyP45b4AvY-qKEFvfjj3w&s',
  })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => OrderDetails, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetails[];
}
