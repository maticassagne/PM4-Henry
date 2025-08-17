import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({
      id: productId,
    });
    if (!product) throw new NotFoundException('Producto no encontrado.');

    const response = await this.fileUploadRepository.uploadImage(file);
    if (!response.secure_url)
      throw new NotFoundException('Error al cargar la imagen...');

    await this.productsRepository.update(productId, {
      imgUrl: response.secure_url,
    });
    const updatedProduct = await this.productsRepository.findOneBy({
      id: productId,
    });
    return updatedProduct;
  }
}
