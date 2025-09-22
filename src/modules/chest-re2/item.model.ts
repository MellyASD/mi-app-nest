export type ICharacter = 'Leon' | 'Claire'; // Define the character types
export interface IItem { // Define the IItem interface
  id: number; // Unique identifier for the item
  name: string;
  type: 'weapon' | 'healing' | 'key' | 'explosive';
  quantity: number;
  restrictedTo?: ICharacter; // Optional property to restrict the item to a specific character
}