"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.updateCustomer = exports.getCustomers = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const connection_1 = __importDefault(require("../db/connection"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email, name, surname, dni, isAdmin } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    //Validacion de si el usuario ya existe en la bd
    const user = yield user_1.User.findOne({ where: { email: email } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el mail ${email}`
        });
    }
    try {
        yield user_1.User.create({
            email: email,
            password: hashedPassword,
            name: name,
            surname: surname,
            dni: dni,
            isAdmin: isAdmin
        });
        res.json({
            msg: `usuario creado exitosamente`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un Error',
            error
        });
    }
});
exports.newUser = newUser;
const getCustomers = (request, response) => {
    let queryTable = "SELECT * FROM users WHERE isAdmin = false";
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
const updateCustomer = (request, response) => {
    let queryControl = "SELECT * FROM users WHERE  dni = ? and isAdmin = false";
    connection_1.default.query({
        query: queryControl,
        values: [request.params.dni]
    }).then((value) => {
        if (value[0].length === 1) {
            //ESTO SE EJECUTA SI EL cliente SE ENCONTRÓ VALUE[0] ESTA LA TUPLA ENCONTRADA EN LA BD
            //AHORA DEBEMOS SABER SI EL EMAIL NO ESTA REPETIDO EN OTRO cliente
            let queryEmail = "SELECT email FROM users WHERE email like ? AND dni <> ? "; //TRAIGO TODOS LOS EMAIL IGUALES AL NUEVO PERO DISTINTO AL cliente(YA QUE PUEDE NO ACTUALIZARLO)
            connection_1.default.query({
                query: queryEmail,
                values: [request.body.email, request.params.dni]
            }).then((resp) => {
                if (resp[0].length == 0) {
                    let queryForUpdate = "UPDATE users SET email = ?, password = ? WHERE dni = ? and isAdmin = false";
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
    let querySearch = "DELETE FROM users WHERE dni = ? and isAdmin = false";
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
