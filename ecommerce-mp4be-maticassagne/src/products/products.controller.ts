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
import { Roles } from 'src/decorators/roles.decorator';
import { ERoles } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Product } from './entities/products.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

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
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  addProduct() {
    return this.productService.addProduct();
  }

  @Get(':id')
  getProductById(@Param() { id }: ParamsWithIdDto) {
    return this.productService.getProductsById(id);
  }

  @Post()
  @ApiBearerAuth()
  @Roles(ERoles.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  createProduct(@Body() product: CreateProductDto) {
    return this.productService.createProduct(product);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(ERoles.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param() { id }: ParamsWithIdDto,
    @Body() product: Partial<Product>,
  ) {
    return this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  deleteProduct(@Param() { id }: ParamsWithIdDto) {
    return this.productService.deleteProduc(id);
  }
}
