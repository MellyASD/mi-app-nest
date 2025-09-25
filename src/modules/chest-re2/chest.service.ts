import { Injectable, NotFoundException } from '@nestjs/common';
import { IItem, ICharacter } from './item.model';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ChestService {
  private maxSlots = 10; // Maximum number of item slots in the chest

  private chest: IItem[] = [ // Sample items in the chest
    { id: 1, name: 'Magnum', type: 'weapon', quantity: 1, restrictedTo: 'Leon' },
    { id: 2, name: 'Hierba Verde', type: 'healing', quantity: 3 },
    { id: 3, name: 'Hierba Roja', type: 'healing', quantity: 2 },
    { id: 4, name: 'Hierba Azul', type: 'healing', quantity: 1 },
    { id: 5, name: 'Granada', type: 'explosive', quantity: 5, restrictedTo: 'Claire' }
  ];

  findAll(character: ICharacter): IItem[] { // Filter items based on character restrictions
    return this.chest.filter(item => !item.restrictedTo || item.restrictedTo === character); // Return items that are either unrestricted or restricted to the specified character
  }

  findOne(id: number): IItem { // Find an item by its ID
    const item = this.chest.find(i => i.id === id); // Search for the item in the chest
    if (!item) throw new NotFoundException(`Item con id ${id} no encontrado`); // Throw an error if the item is not found
    return item;
  }

  create(createItemDto: CreateItemDto): IItem { // Create a new item in the chest
    if (this.chest.length >= this.maxSlots) {
      throw new Error('El baúl está lleno');
    }

    const newId = this.chest.length > 0
      ? this.chest[this.chest.length - 1].id + 1
      : 1;

    const newItem: IItem = {
      id: newId,
      name: createItemDto.name,
      type: createItemDto.type as IItem['type'],
      quantity: createItemDto.quantity,
      restrictedTo: createItemDto.restrictedTo
    };

    this.chest.push(newItem);
    return newItem;
  }

  update(id: number, updateItemDto: UpdateItemDto): IItem {
    const item = this.findOne(id);
    Object.assign(item, updateItemDto);
    return item;
  }

  remove(id: number): { deleted: boolean } {
    const item = this.findOne(id);
    this.chest.splice(this.chest.indexOf(item), 1);
    return { deleted: true };
  }

  combineHerbs(): IItem { // Combine green and red herbs to create a mixed herb
    const green = this.chest.find(i => i.name === 'Hierba Verde' && i.quantity > 0); // Find green herb with quantity > 0
    const red = this.chest.find(i => i.name === 'Hierba Roja' && i.quantity > 0); // Find red herb with quantity > 0

    if (green && red) { // If both herbs are available
      green.quantity--; // Decrease quantity of green herb
      red.quantity--;// Decrease quantity of red herb

      if (green.quantity === 0) {
        this.chest.splice(this.chest.indexOf(green), 1); // Remove green herb if quantity is 0
      }
      if (red.quantity === 0) {
        this.chest.splice(this.chest.indexOf(red), 1); // Remove red herb if quantity is 0
      }

      if (this.chest.length >= this.maxSlots) {
        throw new Error('El baúl está lleno, no se puede agregar la hierba mixta');
      }

      const mixed: IItem = { // Create the mixed herb item
        id: this.chest.length > 0 ? this.chest[this.chest.length - 1].id + 1 : 1,
        name: 'Hierba Mixta (Verde + Roja)',
        type: 'healing',
        quantity: 1
      };

      this.chest.push(mixed);
      return mixed;
    }

    throw new Error('No hay suficientes hierbas para combinar');
  }
}