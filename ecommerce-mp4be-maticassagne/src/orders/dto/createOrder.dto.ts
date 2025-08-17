import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from '../../products/entities/products.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: 'UUID de user',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Array de productos en la Orden. Debe contener al menos 1',
  })
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Product>[];
}
