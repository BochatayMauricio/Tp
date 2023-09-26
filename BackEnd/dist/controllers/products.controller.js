"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneProduct = exports.deleteProduct = exports.updateProduct = exports.newProduct = exports.getProducts = void 0;
const connection_1 = __importDefault(require("../db/connection"));
// es lo mismo que usar import.
const getProducts = (request, response) => {
    let productList = [];
    let queryTable = "SELECT * FROM products";
    connection_1.default.query(queryTable).then((values) => {
        if (values[0].length > 0) {
            productList = values[0];
            response.status(200).json(productList);
        }
        else {
            response.status(404).send({ msg: 'No hay productos cargados' });
        }
    });
};
exports.getProducts = getProducts;
const newProduct = (request, response) => {
    const { body, file } = request;
    //AHORA TRANSFORMAMOS LA IMAGEN QUE VIENE DE TIPO FILE DESDE EL FRONT (Con postman anda pero con el Front no ( consulta)) --> Lo que me da a entender que la API esta bien pero del Front mando mal la info
    if (file != undefined) {
        const url = `http://localhost:3000/Images/${file.filename}`;
        //MANDAMOS A LA BD TODO LISTO
        let query = "INSERT INTO products (model,brand,description,price,stock,date_register,date_updated,image) VALUES (?,?,?,?,?,?,?,?)"; //EL ID ES AUTOINCREMENTAL POR EL MOTOR DE LA BD
        connection_1.default.query({
            query: query,
            values: [body.model, body.brand, body.description, body.price, body.stock, body.date_register, body.date_updated, url]
        }).then(() => {
            response.status(200).send({ msg: 'Producto cagargado Correctamente' });
        })
            .catch((err) => {
            response.status(400).send(err);
        });
    }
    else {
        response.status(404).send({ msg: 'El producto debe tener una imagen' });
    }
};
exports.newProduct = newProduct;
const updateProduct = (request, response) => {
    let queryControl = "SELECT * FROM products WHERE  id = ?";
    connection_1.default.query({
        query: queryControl,
        values: [request.params.id]
    }).then((value) => {
        if (value[0].length === 1) {
            let queryForUpdate = "UPDATE products SET price = ?, stock = ?, description = ?, date_updated = ? WHERE id = ?";
            connection_1.default.query({
                query: queryForUpdate,
                values: [request.body.price, request.body.stock, request.body.description, request.body.date_updated, request.params.id]
            }).finally(() => {
                response.status(200).send({ msg: 'Producto actualizado' });
            });
        }
        else {
            response.status(404).send({ msg: 'Producto no encontrado' });
        }
    });
};
exports.updateProduct = updateProduct;
const deleteProduct = (request, response) => {
    let querySearch = "DELETE FROM products WHERE id = ?";
    connection_1.default.query({
        query: querySearch,
        values: [request.params.id]
    }).then((resp) => {
        if (resp[1]) {
            response.status(200).send({ msg: 'Producto Eliminado' }); //HAY QUE VER COMO HACER PARA RETORNAR 404, AUNQUE SE SUPONE QUE SIEMPRE VA A ESTAR LA TUPLA, YA QUE LA SELECCIONA DE UN PRE-LISTADO
        }
    });
};
exports.deleteProduct = deleteProduct;
const getOneProduct = (request, response) => {
    let querySearch = "SELECT * FROM products WHERE id = ?";
    connection_1.default.query({
        query: querySearch,
        values: [request.params.id]
    }).then((value) => {
        if (value[0].length === 1) {
            response.status(200).json(value[0][0]);
        }
        else {
            response.status(404).send({ msg: 'Producto no encontrado' });
        }
    });
};
exports.getOneProduct = getOneProduct;
