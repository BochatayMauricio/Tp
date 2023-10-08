import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Shipping } from "./shipping";


export const Sales = sequelize.define('sales', {
  dniCustomer: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true
  },
  idProduct: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idShipping: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  dateSale: {
    type: DataTypes.STRING,
    unique: true,
    primaryKey: true

  }
})