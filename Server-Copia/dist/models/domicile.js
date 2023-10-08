"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Domicile = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Domicile = connection_1.default.define('domocile', {
    postalCode: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        primaryKey: true
    },
    street: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        primaryKey: true
    },
    number: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        primaryKey: true
    }
});
