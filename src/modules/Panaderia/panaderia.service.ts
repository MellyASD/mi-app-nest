import {Injectable,NotFoundException,OnModuleInit,} from '@nestjs/common';
import { IProduct, ICombo } from './menu.model';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateComboDto } from './dto/create-combo.dto';

@Injectable()
export class PanaderiaService implements OnModuleInit {
  private products: IProduct[] = [];
  private combos: ICombo[] = [];

  // 🔄 Precarga inicial de productos y combos
onModuleInit() {
  // Fase 1: crear productos
  const ids = [
    this.createProduct({ name: 'Jugo de naranja', price: 3000 }).id,
    this.createProduct({ name: 'Huevos al gusto', price: 4000 }).id,
    this.createProduct({ name: 'Arepa', price: 2000 }).id,
    this.createProduct({ name: 'Café', price: 2500 }).id,
    this.createProduct({ name: 'Chocolate', price: 2500 }).id,
    this.createProduct({ name: 'Pan', price: 1500 }).id,
    this.createProduct({ name: 'Caldo', price: 3500 }).id,
    this.createProduct({ name: 'Tamal', price: 6000 }).id,
  ];

  // Fase 2: crear combos usando los IDs reales
  this.createCombo({ name: 'Desayuno 1', items: [ids[0], ids[1], ids[2]] });
  this.createCombo({ name: 'Desayuno 2', items: [ids[3], ids[1], ids[5]] });
  this.createCombo({ name: 'Desayuno 3', items: [ids[0], ids[4], ids[3], ids[6]] });
  this.createCombo({ name: 'Desayuno 4', items: [ids[7], ids[4], ids[5]] });
}

  // 🥐 Productos
  createProduct(dto: CreateProductDto): IProduct {
    const id = this.products.length + 1;
    const product: IProduct = { id, ...dto };
    this.products.push(product);
    return product;
  }

  updateProduct(id: number, dto: Partial<CreateProductDto>): IProduct {
    const product = this.findProduct(id);
    Object.assign(product, dto);
    return product;
  }

  removeProduct(id: number): { deleted: boolean } {
    const product = this.findProduct(id);
    this.products.splice(this.products.indexOf(product), 1);
    return { deleted: true };
  }

  findProduct(id: number): IProduct {
    const product = this.products.find(p => p.id === id);
    if (!product) throw new NotFoundException(`Producto con id ${id} no encontrado`);
    return product;
  }

  listProducts(): IProduct[] {
    return this.products;
  }

  // 🍽️ Combos
  createCombo(dto: CreateComboDto): ICombo {
    const id = this.combos.length + 1;
    const items = dto.items.map(id => this.findProduct(id));
    const combo: ICombo = { id, name: dto.name, items };
    this.combos.push(combo);
    return combo;
  }

  updateCombo(id: number, dto: Partial<CreateComboDto>): ICombo {
    const combo = this.findCombo(id);
    if (dto.name) combo.name = dto.name;
    if (dto.items) combo.items = dto.items.map(id => this.findProduct(id));
    return combo;
  }

  removeCombo(id: number): { deleted: boolean } {
    const combo = this.findCombo(id);
    this.combos.splice(this.combos.indexOf(combo), 1);
    return { deleted: true };
  }

  findCombo(id: number): ICombo {
    const combo = this.combos.find(c => c.id === id);
    if (!combo) throw new NotFoundException(`Combo con id ${id} no encontrado`);
    return combo;
  }

  listCombos(): ICombo[] {
    return this.combos;
  }
}