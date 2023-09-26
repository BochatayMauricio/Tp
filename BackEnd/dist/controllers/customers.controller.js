"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneCustomer = exports.deleteCustomer = exports.updateCustomer = exports.newCustomer = exports.getCustomers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const connection_1 = __importDefault(require("../db/connection"));
const getCustomers = (request, response) => {
    let queryTable = "SELECT * FROM customers";
    let customerList = [];
    connection_1.default.query(queryTable).then((values) => {
        if (values[0].length > 0) {
            customerList = values[0];
            response.status(200).json(customerList);
        }
        else {
            response.status(404).send({ msg: 'No hay clientes cargados' });
        }
    });
};
exports.getCustomers = getCustomers;
const newCustomer = (request, response) => {
    let hashedPassword = '';
    let query = "INSERT INTO customers VALUES (?,?,?,?,?)";
    let queryControl = "SELECT email,dni FROM customers WHERE (email like ?) OR (dni = ?)";
    connection_1.default.query({
        query: queryControl,
        values: [request.body.email, request.body.dni]
    }).then((value) => {
        if (value[0].length <= 0) {
            bcrypt_1.default.hash(request.body.password, 10).then((value) => hashedPassword = value).finally(() => {
                console.log(hashedPassword); //contraseña encriptada
                connection_1.default.query({
                    query: query,
                    values: [request.body.dni, request.body.name, request.body.surname, request.body.email, hashedPassword],
                }).then(() => {
                    response.status(200).send({ msg: 'cliente registrador correctamente' });
                })
                    .catch((err) => {
                    response.status(400).send({ msg: 'No se pudo registrar ' });
                });
            });
        }
        else {
            response.status(404).send('email duplicado o cliente ya resgistrado');
        }
    });
};
exports.newCustomer = newCustomer;
const updateCustomer = (request, response) => {
    let queryControl = "SELECT * FROM customers WHERE  dni = ?";
    connection_1.default.query({
        query: queryControl,
        values: [request.params.dni]
    }).then((value) => {
        if (value[0].length === 1) {
            //ESTO SE EJECUTA SI EL cliente SE ENCONTRÓ VALUE[0] ESTA LA TUPLA ENCONTRADA EN LA BD
            //AHORA DEBEMOS SABER SI EL EMAIL NO ESTA REPETIDO EN OTRO cliente
            let queryEmail = "SELECT email FROM customers WHERE email like ? AND dni <> ? "; //TRAIGO TODOS LOS EMAIL IGUALES AL NUEVO PERO DISTINTO AL cliente(YA QUE PUEDE NO ACTUALIZARLO)
            connection_1.default.query({
                query: queryEmail,
                values: [request.body.email, request.params.dni]
            }).then((resp) => {
                if (resp[0].length == 0) {
                    let queryForUpdate = "UPDATE customers SET email = ?, password = ? WHERE dni = ?";
                    let hashedPassword = '';
                    bcrypt_1.default.hash(request.body.password, 10).then((value) => hashedPassword = value).finally(() => {
                        connection_1.default.query({
                            query: queryForUpdate,
                            values: [request.body.email, hashedPassword, request.params.dni]
                        }).then(() => {
                            response.send({ msg: 'Cliente actiualizado' });
                        });
                    }); //hasheo 
                }
                else {
                    response.status(404).send({ msg: 'Email duplicado' });
                }
            });
        }
        else {
            response.status(404).send({ msg: 'Cliente no encontrado' });
        }
    });
};
exports.updateCustomer = updateCustomer;
const deleteCustomer = (request, response) => {
    let querySearch = "DELETE FROM customers WHERE dni = ?";
    connection_1.default.query({
        query: querySearch,
        values: [request.params.dni]
    }).then((resp) => {
        if (resp[1]) {
            response.status(200).send({ msg: 'Cliente Eliminado' }); //HAY QUE VER COMO HACER PARA RETORNAR 404, AUNQUE SE SUPONE QUE SIEMPRE VA A ESTAR LA TUPLA, YA QUE LA ELIMINA DE UN LISTADO
        }
    });
};
exports.deleteCustomer = deleteCustomer;
const getOneCustomer = (request, response) => {
    let querySearch = "SELECT * FROM customers WHERE dni = ?";
    connection_1.default.query({
        query: querySearch,
        values: [request.params.dni]
    }).then((value) => {
        if (value[0].length === 1) {
            response.status(200).json(value[0][0]);
        }
        else {
            response.status(404).send({ msg: 'No encontrado' });
        }
    });
};
exports.getOneCustomer = getOneCustomer;
