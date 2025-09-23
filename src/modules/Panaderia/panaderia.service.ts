import {Injectable,NotFoundException,OnModuleInit,} from '@nestjs/common';
import { IProduct, ICombo } from './menu.model'; // Importa las interfaces
import { CreateProductDto } from './dto/create-product.dto'; // DTO para crear productos
import { CreateComboDto } from './dto/create-combo.dto'; // DTO para crear combos

@Injectable()
export class PanaderiaService implements OnModuleInit {// Implementa OnModuleInit para precarga
  private products: IProduct[] = []; // Almacena productos
  private combos: ICombo[] = []; // Almacena combos

  // 🔄 Precarga inicial
  onModuleInit() {//
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
    const id = this.products.length + 1;// Genera un ID simple
    const { name, price } = dto;
    const product: IProduct = { id, name, price };// Crea el producto
    this.products.push(product);// Lo añade al array
    return product;// Retorna el producto creado
  }

  updateProductByName(name: string, dto: Partial<CreateProductDto>): IProduct {// Partial permite campos opcionales
    const product = this.findProductByName(name);// Busca el producto por nombre
    Object.assign(product, dto);// Actualiza los campos
    return product;
  }

  removeProductByName(name: string): { deleted: boolean } {// Retorna un objeto indicando si fue eliminado
    const product = this.findProductByName(name);// Busca el producto
    this.products.splice(this.products.indexOf(product), 1);// Lo elimina del array
    return { deleted: true };// Retorna confirmación
  }

  findProductByName(name: string): IProduct {// Busca un producto por su nombre 
    const product = this.products.find(p => p.name.toLowerCase() === name.toLowerCase());// Búsqueda 
    if (!product) throw new NotFoundException(`Producto con nombre "${name}" no encontrado`);// Error si no existe
    return product;// Retorna el producto encontrado
  }

  listProducts(): IProduct[] {// Retorna todos los productos
    return this.products;
  }

  // 🍽️ Combos por número
  createCombo(dto: { name: string; items: string[] }): ICombo { // Crea un combo
    const id = this.combos.length + 1; // Genera un ID simple
    const items = dto.items.map(name => this.findProductByName(name)); // Mapea nombres a productos
    const combo: ICombo = { id, name: dto.name, items }; // Crea el combo
    this.combos.push(combo); // Lo añade al array
    return combo; // Retorna el combo creado
  }
  getComboWithTotalPrice(number: number): { combo: ICombo; total: number } { // Retorna combo con precio total
  const combo = this.findComboByNumber(number);     // Busca el combo por número
  const total = combo.items.reduce((sum, item) => sum + item.price, 0);     // Calcula el precio total
  return { combo, total };
}


  updateComboByNumber(number: number, dto: Partial<{ name: string; items: string[] }>): ICombo { // Actualiza un combo
    const combo = this.findComboByNumber(number); // Busca el combo por número
    if (dto.name) combo.name = dto.name; // Actualiza el nombre si se proporciona
    if (dto.items) combo.items = dto.items.map(name => this.findProductByName(name)); // Actualiza los items si se proporcionan
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