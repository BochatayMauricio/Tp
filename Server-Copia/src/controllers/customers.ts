import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken'
import { json } from 'sequelize';
import connection from '../db/connection'


export const newUser = async (req: Request, res: Response) => {

  const { password, email, name, surname, dni, isAdmin } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);


  //Validacion de si el usuario ya existe en la bd
  const user = await User.findOne({ where: { email: email } })

  if (user) {
    return res.status(400).json({
      msg: `Ya existe un usuario con el mail ${email}`
    })
  }

  try {
    await User.create({
      email: email,
      password: hashedPassword,
      name: name,
      surname: surname,
      dni: dni,
      isAdmin: isAdmin
    });

    res.json({
      msg: `usuario creado exitosamente`,
    })

  } catch (error) {
    res.status(400).json({
      msg: 'Ocurrio un Error',
      error
    });
  }


}

export const getCustomers = (request: Request, response: Response) => {
  let queryTable = "SELECT * FROM users WHERE isAdmin = false";
  let customerList: any[] = [];
  connection.query(queryTable).then((values) => {
    if (values[0].length > 0) {
      customerList = values[0];
      response.status(200).json(customerList);
    } else {
      response.status(404).send({ msg: 'No hay clientes cargados' })
    }
  })
}

export const updateCustomer = (request: Request, response: Response) => {
  let queryControl = "SELECT * FROM users WHERE  dni = ? and isAdmin = false";
  connection.query({
    query: queryControl,
    values: [request.params.dni]
  }).then((value) => {
    if (value[0].length === 1) {
      //ESTO SE EJECUTA SI EL cliente SE ENCONTRÓ VALUE[0] ESTA LA TUPLA ENCONTRADA EN LA BD
      //AHORA DEBEMOS SABER SI EL EMAIL NO ESTA REPETIDO EN OTRO cliente
      let queryEmail = "SELECT email FROM users WHERE email like ? AND dni <> ? "; //TRAIGO TODOS LOS EMAIL IGUALES AL NUEVO PERO DISTINTO AL cliente(YA QUE PUEDE NO ACTUALIZARLO)
      connection.query({
        query: queryEmail,
        values: [request.body.email, request.params.dni]
      }).then((resp) => {
        if (resp[0].length == 0) {
          let queryForUpdate = "UPDATE users SET email = ?, password = ? WHERE dni = ? and isAdmin = false";
          let hashedPassword = '';
          bcrypt.hash(request.body.password, 10).then((value) => hashedPassword = value).finally(() => {
            connection.query({
              query: queryForUpdate,
              values: [request.body.email, hashedPassword, request.params.dni]
            }).then(() => {
              response.send({ msg: 'Cliente actiualizado' })
            })
          }) //hasheo 
        }
        else { response.status(404).send({ msg: 'Email duplicado' }) }
      })
    } else {
      response.status(404).send({ msg: 'Cliente no encontrado' })
    }
  })
}

export const deleteCustomer = (request: Request, response: Response) => {
  let querySearch = "DELETE FROM users WHERE dni = ? and isAdmin = false";
  connection.query({
    query: querySearch,
    values: [request.params.dni]
  }).then((resp) => {
    if (resp[1]) {
      response.status(200).send({ msg: 'Cliente Eliminado' })  //HAY QUE VER COMO HACER PARA RETORNAR 404, AUNQUE SE SUPONE QUE SIEMPRE VA A ESTAR LA TUPLA, YA QUE LA ELIMINA DE UN LISTADO
    }
  })
}

