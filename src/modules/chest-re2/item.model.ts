export type ICharacter = 'Leon' | 'Claire'; // Define the character types

//* Define the IItem interface and its properties and character restrictions
export interface IItem { 
  id: number;  
  name: string;
  type: 'weapon' | 'healing' | 'key' | 'explosive';
  quantity: number;
  restrictedTo?: ICharacter; 
}