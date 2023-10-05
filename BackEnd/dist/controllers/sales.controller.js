"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSales = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getSales = (request, response) => {
    let queryTable = 'SELECT * FROM sales INNER JOIN users ON users.id = sales.idCustomer INNER JOIN products ON products.id = sales.idProduct';
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
