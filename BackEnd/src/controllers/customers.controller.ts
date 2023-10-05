import {Request,Response} from 'express';
import bcrypt from 'bcrypt';
import connection from '../db/connection';


export const getCustomers = (request:Request,response:Response)=>{
  let queryTable = "SELECT * FROM users WHERE isAdmin = false";
  let customerList:any[]=[];
  connection.query(queryTable).then((values)=>{
    if(values[0].length > 0){
      customerList = values[0];
      response.status(200).json(customerList);
    }else{
      response.status(404).send({msg:'No hay clientes cargados'})
    }
  })
} 

export const newCustomer = (request:Request, response:Response)=>{
  let hashedPassword = '';
  let query = "INSERT INTO users(dni,name,surname,email,password,isAdmin) VALUES (?,?,?,?,?,?)"
  let queryControl = "SELECT email,dni FROM users WHERE (email like ?) OR (dni = ?)";
  connection.query({
    query: queryControl,
    values: [request.body.email,request.body.dni]
  }).then((value)=>{
    if(value[0].length <= 0){ 
      bcrypt.hash(request.body.password,10).then((value)=> hashedPassword = value).finally(()=>{
      console.log(hashedPassword) //contraseña encriptada
        connection.query({
          query: query,
          values:[request.body.dni,request.body.name,request.body.surname,request.body.email,hashedPassword,false],
        }).then(()=>{
          response.status(200).send({msg:'cliente registrador correctamente'})
        })
        .catch((err)=>{
          response.status(400).send({msg: 'No se pudo registrar '})
        })
      });
    }
    else{
      response.status(404).send('email duplicado o cliente ya resgistrado')
    }
  })
}

export const updateCustomer = (request:Request, response:Response)=>{
  let queryControl = "SELECT * FROM users WHERE  dni = ? and isAdmin = false";
  connection.query({
    query: queryControl,
    values: [request.params.dni]
  }).then((value)=>{
    if(value[0].length === 1){
      //ESTO SE EJECUTA SI EL cliente SE ENCONTRÓ VALUE[0] ESTA LA TUPLA ENCONTRADA EN LA BD
      //AHORA DEBEMOS SABER SI EL EMAIL NO ESTA REPETIDO EN OTRO cliente
      let queryEmail = "SELECT email FROM users WHERE email like ? AND dni <> ? "; //TRAIGO TODOS LOS EMAIL IGUALES AL NUEVO PERO DISTINTO AL cliente(YA QUE PUEDE NO ACTUALIZARLO)
      connection.query({
        query: queryEmail,
        values: [request.body.email,request.params.dni]
      }).then((resp)=>{
        if(resp[0].length == 0){
              let queryForUpdate= "UPDATE users SET email = ?, password = ? WHERE dni = ? and isAdmin = false";
              let hashedPassword = '';
              bcrypt.hash(request.body.password,10).then((value)=> hashedPassword = value).finally(()=>{
              connection.query({
                  query: queryForUpdate,
                  values: [request.body.email,hashedPassword,request.params.dni]
                }).then(()=>{
                      response.send({msg:'Cliente actiualizado'})
                    })
                }) //hasheo 
         }
         else{ response.status(404).send({msg:'Email duplicado'})}
      })
    }else{
      response.status(404).send({msg:'Cliente no encontrado'})
    }
  })
}

export const deleteCustomer = (request:Request, response:Response)=>{
  let querySearch = "DELETE FROM users WHERE dni = ? and isAdmin = false";
  connection.query({
    query: querySearch,
    values: [request.params.dni]
  }).then((resp)=>{
    if(resp[1]){
    response.status(200).send({msg:'Cliente Eliminado'})  //HAY QUE VER COMO HACER PARA RETORNAR 404, AUNQUE SE SUPONE QUE SIEMPRE VA A ESTAR LA TUPLA, YA QUE LA ELIMINA DE UN LISTADO
    }
  })
}

export const getOneCustomer = (request:Request, response:Response)=>{
  let querySearch = "SELECT * FROM users WHERE dni = ? and isAdmin = false";
  connection.query({
    query:querySearch,
    values: [request.params.dni]
  }).then((value)=>{
    if(value[0].length === 1){
      response.status(200).json(value[0][0]);
    }else{
      response.status(404).send({msg:'No encontrado'});
    }
  })
};
