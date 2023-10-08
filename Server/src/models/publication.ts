import { DataTypes } from "sequelize";
import sequelize from "../db/connection";


export const Publication = sequelize.define('publication', {
  idAdministrator: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true
  },
  idProduct: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true
  },
  datePublication: {
    type: DataTypes.STRING,
    unique: true,
    primaryKey: true
  }
})