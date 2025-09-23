export interface IProduct { // Producto individual
  id: number;
  name: string;
  price: number;
}

export interface ICombo { // Combo de productos
  id: number;
  name: string;
  items: IProduct[];
}