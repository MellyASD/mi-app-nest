import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Product } from '@entities/product.entity';
import { Combo } from '@entities/combo.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateComboDto } from './dto/create-combo.dto';
import { ComboResponseDto } from './dto/combo-response.dto';

@Injectable()
export class PanaderiaService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Combo)
    private readonly comboRepo: Repository<Combo>,
  ) {}

  // 🔹 Productos
  async createProduct(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(dto);
    return this.productRepo.save(product);
  }

  async listProducts(): Promise<Product[]> {
    return this.productRepo.find();
  }

  async findProductByName(name: string): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { name } });
    if (!product) throw new NotFoundException(`Producto "${name}" no encontrado`);
    return product;
  }

  async updateProductByName(name: string, dto: Partial<CreateProductDto>): Promise<Product> {
    const product = await this.findProductByName(name);
    Object.assign(product, dto);
    return this.productRepo.save(product);
  }

  async removeProductByName(name: string): Promise<{ deleted: boolean }> {
    const product = await this.findProductByName(name);
    await this.productRepo.remove(product);
    return { deleted: true };
  }

  // 🔹 Combos
  async createCombo(dto: CreateComboDto): Promise<Combo> {
    const products = await this.productRepo.findBy({ id: In(dto.products) });
    if (products.length !== dto.products.length) {
      throw new BadRequestException('Uno o más productos no existen');
    }

    const count = await this.comboRepo.count();
    const name = `Desayuno ${count + 1}`;

    const combo = this.comboRepo.create({ name, products });
    return this.comboRepo.save(combo);
  }

 async listCombos(): Promise<ComboResponseDto[]> {
  const combos = await this.comboRepo.find({ relations: ['products'] });

  return combos.map(combo => ({
    id: combo.id,
    name: combo.name,
    products: combo.products,
    price: combo.products.reduce((sum, item) => sum + Number(item.price), 0), // siempre devuelve number
  }));
}


  async findComboByName(name: string): Promise<Combo> {
    const combo = await this.comboRepo.findOne({ where: { name }, relations: ['products'] });
    if (!combo) throw new NotFoundException(`Combo "${name}" no encontrado`);

    combo.price = combo.products.reduce((sum, item) => sum + Number(item.price), 0);
    return combo;
  }

  async updateComboByName(name: string, dto: Partial<CreateComboDto>): Promise<Combo> {
    const combo = await this.findComboByName(name);

    if (dto.products) {
      const products = await this.productRepo.findBy({ id: In(dto.products) });
      if (products.length !== dto.products.length) {
        throw new BadRequestException('Uno o más productos no existen');
      }
      combo.products = products;
    }

    return this.comboRepo.save(combo);
  }

  async removeComboByName(name: string): Promise<{ deleted: boolean }> {
    const combo = await this.findComboByName(name);
    await this.comboRepo.remove(combo);
    return { deleted: true };
  }
}