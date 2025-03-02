import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product)
  private productRepository: Repository<Product>)
  {}
  
  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: "Sabritas Adobadas 48g",
      price: 19,
      countSeal: 3,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Gatorade Frutas 600ml",
      price:35,
      countSeal: 2,
      provider: uuid()
    },
    {
      productId: uuid(),
      productName: "Agua Ciel 1L",
      price: 15,
      countSeal: 0,
      provider: uuid()
    }
  ]
  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto)
    return product;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
   const productFound = this.products.filter((product)=>product.productId === id)[0]
   if (!productFound) throw new NotFoundException()
    return productFound;
  }

  findByProvider(id: string){
    const productsFound = this.products.filter((product)=> product.provider === id)
    if (productsFound.length === 0) throw new NotFoundException()
    return productsFound;
  }


  update(id: string, updateProductDto: UpdateProductDto) {
    let updatedProduct: any = null;
    
    this.products = this.products.map((product) => {
        if (product.productId === id) {            
            updatedProduct = {
                ...product,
                ...updateProductDto,
            };
            return updatedProduct;
        }
        return product;
    });
    
    if (!updatedProduct) {
        throw new Error(`Product with ID ${id} not found`);
    }

    return updatedProduct;
}

  remove(id: string) {
    const { productId } = this.findOne(id)
    this.products = this.products.filter((product)=> product.productId !== productId)
    return this.products
  }
}
