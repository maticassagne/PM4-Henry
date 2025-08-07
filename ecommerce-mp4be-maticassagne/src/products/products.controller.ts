import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ParamsWithIdDto } from 'src/common/dto/idParams.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) {
      return this.productService.getProducts(Number(page), Number(limit));
    } else {
      return this.productService.getProducts(1, 5);
    }
  }

  @Get('seeder')
  addProduct() {
    return this.productService.addProduct();
  }

  @Get(':id')
  getProductById(@Param() { id }: ParamsWithIdDto) {
    return this.productService.getProductsById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createProduct(@Body() product: any) {
    return this.productService.createProduct(product);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateProduct(@Param() { id }: ParamsWithIdDto, @Body() product: any) {
    return this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param() { id }: ParamsWithIdDto) {
    return this.productService.deleteProduc(id);
  }
}
