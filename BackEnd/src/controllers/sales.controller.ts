import { Request,Response, request } from "express";
import connection from '../db/connection';

export const getSales = (request:Request,response:Response)=>{
  let queryTable = 'SELECT * FROM sales';
  let salesList:any[] = [];
  connection.query(queryTable).then((values)=>{
    if(values[0].length > 0 ){
      salesList = values[0]; //porque esta promesa devuelve un arreglo, donde la primera posicion contiene otro arreglo de la data
      response.status(200).json(salesList)
    }else{
      response.status(404).send({msg: 'No hay ventas registradas'})
    }
  })
} 

export const getOneSell = (request:Request,response:Response)=>{ //en realidad duelve las ventas de un cliente en especifico, se recibe el dni por parametro en la url 
  let querySearch = "SELECT * FROM sales WHERE dniCustomer = ?"
  connection.query({
    query: querySearch,
    values: [request.params.dniCustomer]
  }).then((values)=>{
    if(values[0].length > 0 ){
      response.status(200).json(values[0])
    }else{
      response.status(400).send({msg:'No se encontro ninguna compra de este Cliente'})
    }
  })
}

export const newSell = (request:Request,response:Response)=>{
  let query = "INSERT INTO sales VALUES (?,?,?,?,?)";
  connection.query({
    query: query,
    values: [request.body.dniCustomer,request.body.idProduct,request.body.quantity,request.body.idShipping,request.body.dateSale]
  }).then(()=>{
    response.status(200).send({msg:'Venta registrada correctamente'})
  })
  .catch((err)=>{
    response.status(400).send(err)
  })
}

