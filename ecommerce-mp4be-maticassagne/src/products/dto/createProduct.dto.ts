import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Category } from 'src/categories/entities/categories.entity';
import { OrderDetails } from 'src/orderDetails/entities/orderDetails.entity';

export class CreateProductDto {
  id: string;
  orderDetails: OrderDetails[];

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  description: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsString()
  @IsOptional()
  imgUrl: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Category)
  category: Category;
}
