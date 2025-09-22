export interface IProduct {
  id: number;
  name: string;
  price: number;
}

export interface ICombo {
  id: number;
  name: string;
  items: IProduct[];
}