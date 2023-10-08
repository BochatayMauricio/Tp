export interface product{
  id?:number|null,
  model?:string|null,
  brand?:string|null,
  price?:number|null,
  stock?:number|null,
  description?:string|null,
  date_register?:string|null,
  date_updated?:string|null,
  file?: File | null
}