export interface sales {
  dniCustomer: number, //PK
  idProduct: number, //PK
  quantity: number,
  idShipping: number, //FK, ALLOW NULL
  dateSale: string //PK
}