export interface product {
  id: number, //PK
  model: string,
  brand: string
  description: string,
  price: number;
  stock: number;
  date_register: string;
  date_updated: string;
  image: string;
}