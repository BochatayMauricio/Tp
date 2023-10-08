"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sales = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Sales = connection_1.default.define('sales', {
    dniCustomer: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        primaryKey: true
    },
    idProduct: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        primaryKey: true
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    idShipping: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    dateSale: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        primaryKey: true
    }
});
