import { Injectable } from '@nestjs/common';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
};

const products = [
  {
    id: '1',
    name: 'Donuts de Homer',
    description: 'Deliciosos donuts glaseados, favoritos de Homer Simpson.',
    price: 2.5,
    stock: true,
    imgUrl: 'https://example.com/donuts.jpg',
  },
  {
    id: '2',
    name: 'Cerveza Duff',
    description: 'La famosa cerveza de Springfield, perfecta para relajarse.',
    price: 3.0,
    stock: true,
    imgUrl: 'https://example.com/duffbeer.jpg',
  },
  {
    id: '3',
    name: 'Figurita de Bart',
    description: 'Figurita coleccionable de Bart Simpson en su patineta.',
    price: 15.0,
    stock: true,
    imgUrl: 'https://example.com/bartfigurine.jpg',
  },
  {
    id: '4',
    name: 'Camisa de Marge',
    description:
      'Camisa azul inspirada en el icónico atuendo de Marge Simpson.',
    price: 25.0,
    stock: false,
    imgUrl: 'https://example.com/marge-shirt.jpg',
  },
  {
    id: '5',
    name: 'Juego de mesa de Los Simpson',
    description:
      'Diviértete con este juego de mesa basado en la familia Simpson.',
    price: 30.0,
    stock: true,
    imgUrl: 'https://example.com/simpsonsboardgame.jpg',
  },
  {
    id: '6',
    name: 'Muñeco de Lisa',
    description: 'Muñeco de acción de Lisa Simpson, con su saxofón.',
    price: 20.0,
    stock: true,
    imgUrl: 'https://example.com/lisamuñeco.jpg',
  },
  {
    id: '7',
    name: 'Camiseta de Springfield',
    description: 'Camiseta con el logo de Springfield, ideal para fanáticos.',
    price: 18.0,
    stock: true,
    imgUrl: 'https://example.com/springfield-shirt.jpg',
  },
  {
    id: '8',
    name: 'Taza de Moe',
    description: 'Taza de café de Moe Szyslak, perfecta para tus mañanas.',
    price: 10.0,
    stock: true,
    imgUrl: 'https://example.com/moe-mug.jpg',
  },
  {
    id: '9',
    name: 'Póster de Los Simpson',
    description:
      'Póster colorido de la familia Simpson para decorar tu habitación.',
    price: 12.0,
    stock: true,
    imgUrl: 'https://example.com/simpsons-poster.jpg',
  },
  {
    id: '10',
    name: 'Gorra de Krusty',
    description: 'Gorra con el logo de Krusty el payaso, ideal para los fans.',
    price: 15.0,
    stock: false,
    imgUrl: 'https://example.com/krusty-hat.jpg',
  },
];

@Injectable()
export class ProductsRepository {
  async getAllProducts(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const productList = products.slice(start, end);
    return await productList;
  }

  async getProductById(id: string) {
    const foundProduct = await products.find((p) => p.id === id);
    return foundProduct;
  }

  async newProduct(product: any) {
    await products.push({ id: product.name, ...product });
    const newProduct = products[products.length - 1];
    return newProduct.id;
  }

  async updateProduct(id: string, product: any) {
    const index = await products.findIndex((p) => p.id === id);
    if (index === -1) return 'No se encontró el producto';
    products[index] = { ...products[index], ...product };
    return products[index].id;
  }

  async deleteProduct(id: string) {
    const index = await products.findIndex((p) => p.id === id);
    if (index === -1) return 'No se encontró el producto';
    await products.splice(index, 1);
    return id;
  }
}
