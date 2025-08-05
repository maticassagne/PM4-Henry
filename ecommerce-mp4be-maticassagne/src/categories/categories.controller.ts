import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getcategories() {
    return this.categoriesService.getCategories();
  }

  @Get('seeder')
  addcategories() {
    return this.categoriesService.addCategory();
  }
}
