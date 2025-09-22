import {
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { IProduct, ICombo } from './menu.model';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateComboDto } from './dto/create-combo.dto';

@Injectable()
export class PanaderiaService implements OnModuleInit {
  private products: IProduct[] = [];
  private combos: ICombo[] = [];

  // 🔄 Precarga inicial
  onModuleInit() {
    this.createProduct({ name: 'Jugo de naranja', price: 3000 });
    this.createProduct({ name: 'Huevos al gusto', price: 4000 });
    this.createProduct({ name: 'Arepa', price: 2000 });
    this.createProduct({ name: 'Café', price: 2500 });
    this.createProduct({ name: 'Chocolate', price: 2500 });
    this.createProduct({ name: 'Pan', price: 1500 });
    this.createProduct({ name: 'Caldo', price: 3500 });
    this.createProduct({ name: 'Tamal', price: 6000 });

    this.createCombo({ name: 'Desayuno 1', items: ['Jugo de naranja', 'Huevos al gusto', 'Arepa'] });
    this.createCombo({ name: 'Desayuno 2', items: ['Café', 'Huevos al gusto', 'Pan'] });
    this.createCombo({ name: 'Desayuno 3', items: ['Jugo de naranja', 'Chocolate', 'Café', 'Caldo'] });
    this.createCombo({ name: 'Desayuno 4', items: ['Tamal', 'Chocolate', 'Pan'] });
  }

  // 🥐 Productos por nombre
  createProduct(dto: CreateProductDto): IProduct {
    const id = this.products.length + 1;
    const { name, price } = dto;
    const product: IProduct = { id, name, price };
    this.products.push(product);
    return product;
  }

  updateProductByName(name: string, dto: Partial<CreateProductDto>): IProduct {
    const product = this.findProductByName(name);
    Object.assign(product, dto);
    return product;
  }

  removeProductByName(name: string): { deleted: boolean } {
    const product = this.findProductByName(name);
    this.products.splice(this.products.indexOf(product), 1);
    return { deleted: true };
  }

  findProductByName(name: string): IProduct {
    const product = this.products.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (!product) throw new NotFoundException(`Producto con nombre "${name}" no encontrado`);
    return product;
  }

  listProducts(): IProduct[] {
    return this.products;
  }

  // 🍽️ Combos por número
  createCombo(dto: { name: string; items: string[] }): ICombo {
    const id = this.combos.length + 1;
    const items = dto.items.map(name => this.findProductByName(name));
    const combo: ICombo = { id, name: dto.name, items };
    this.combos.push(combo);
    return combo;
  }

  updateComboByNumber(number: number, dto: Partial<{ name: string; items: string[] }>): ICombo {
    const combo = this.findComboByNumber(number);
    if (dto.name) combo.name = dto.name;
    if (dto.items) combo.items = dto.items.map(name => this.findProductByName(name));
    return combo;
  }

  removeComboByNumber(number: number): { deleted: boolean } {
    const combo = this.findComboByNumber(number);
    this.combos.splice(this.combos.indexOf(combo), 1);
    return { deleted: true };
  }

  findComboByNumber(number: number): ICombo {
    const name = `Desayuno ${number}`;
    const combo = this.combos.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (!combo) throw new NotFoundException(`Combo número ${number} no encontrado`);
    return combo;
  }

  listCombos(): ICombo[] {
    return this.combos;
  }
}