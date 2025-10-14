import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Item } from '@entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
//* Service for managing chest items, including CRUD operations and herb combination */
@Injectable()
export class ChestService {

  private maxSlots = 10;
//* Injecting the Item repository for database operations */
  constructor(
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
  ) {}
//* Find all items available for a specific character */
  async findAll(character: 'Leon' | 'Claire'): Promise<Item[]> {
    return this.itemRepo.find({
      where: [
        { restrictedTo: undefined },
        { restrictedTo: character },
      ],
    });
  }
//* Find all items in the chest, regardless of character restriction */
  async findAllItems() {
    return this.itemRepo.find();
  }
//* Find a single item by its ID */
  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepo.findOneBy({ id });
    if (!item) throw new NotFoundException(`Item con id ${id} no encontrado`);
    return item;
  }
//* Create a new item in the chest, ensuring it doesn't exceed max slots */
  async create(createItemDto: CreateItemDto): Promise<Item> {
    const count = await this.itemRepo.count();
    if (count >= this.maxSlots) throw new Error('El baúl está lleno');

    const newItem = this.itemRepo.create(createItemDto);
    return this.itemRepo.save(newItem);
  }
//* Update an existing item by its ID */
  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.findOne(id);
    const updated = Object.assign(item, updateItemDto);
    return this.itemRepo.save(updated);
  }
//* Delete an item from the chest by its ID */
  async remove(id: number): Promise<{ deleted: boolean }> {
    const item = await this.findOne(id);
    await this.itemRepo.remove(item);
    return { deleted: true };
  }
//* Combine green and red herbs to create a mixed herb */
  async combineHerbs(): Promise<Item> {
    const green = await this.itemRepo.findOne({ where: { name: 'Hierba Verde', quantity: MoreThan(0) } });
    const red = await this.itemRepo.findOne({ where: { name: 'Hierba Roja', quantity: MoreThan(0) } });

    if (!green || !red) throw new Error('No hay suficientes hierbas para combinar');

    green.quantity--;
    red.quantity--;

    await this.itemRepo.save([green, red]);

    const count = await this.itemRepo.count();
    if (count >= this.maxSlots) throw new Error('El baúl está lleno, no se puede agregar la hierba mixta');

    const mixed = this.itemRepo.create({
      name: 'Hierba Mixta (Verde + Roja)',
      type: 'healing',
      quantity: 1,
    });

    return this.itemRepo.save(mixed);
  }
}