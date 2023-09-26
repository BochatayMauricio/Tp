"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newSell = exports.getOneSell = exports.getSales = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getSales = (request, response) => {
    let queryTable = 'SELECT * FROM sales';
    let salesList = [];
    connection_1.default.query(queryTable).then((values) => {
        if (values[0].length > 0) {
            salesList = values[0]; //porque esta promesa devuelve un arreglo, donde la primera posicion contiene otro arreglo de la data
            response.status(200).json(salesList);
        }
        else {
            response.status(404).send({ msg: 'No hay ventas registradas' });
        }
    });
};
exports.getSales = getSales;
const getOneSell = (request, response) => {
    let querySearch = "SELECT * FROM sales WHERE dniCustomer = ?";
    connection_1.default.query({
        query: querySearch,
        values: [request.params.dniCustomer]
    }).then((values) => {
        if (values[0].length > 0) {
            response.status(200).json(values[0]);
        }
        else {
            response.status(400).send({ msg: 'No se encontro ninguna compra de este Cliente' });
        }
    });
};
exports.getOneSell = getOneSell;
const newSell = (request, response) => {
    let query = "INSERT INTO sales VALUES (?,?,?,?,?)";
    connection_1.default.query({
        query: query,
        values: [request.body.dniCustomer, request.body.idProduct, request.body.quantity, request.body.idShipping, request.body.dateSale]
    }).then(() => {
        response.status(200).send({ msg: 'Venta registrada correctamente' });
    })
        .catch((err) => {
        response.status(400).send(err);
    });
};
exports.newSell = newSell;
