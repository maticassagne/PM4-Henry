import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
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
import { Category } from '../../categories/entities/categories.entity';
import { OrderDetails } from '../../orderDetails/entities/orderDetails.entity';

export class CreateProductDto {
  @ApiHideProperty()
  id: string;
  @ApiHideProperty()
  orderDetails: OrderDetails[];

  @ApiProperty({
    example: 'Test Product',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: 'Test Description',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  description: string;

  @ApiProperty({ example: 120 })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @ApiProperty({ example: 20 })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({ description: 'URL de imagen' })
  @IsString()
  @IsOptional()
  imgUrl: string;

  @ApiProperty({ example: 'TestCategory' })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Category)
  category: Category;
}
