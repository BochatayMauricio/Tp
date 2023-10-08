import { DataTypes } from "sequelize";
import sequelize from "../db/connection";


export const Domicile = sequelize.define('domocile', {
  postalCode: {
    type: DataTypes.STRING,
    unique: true,
    primaryKey: true
  },
  street: {
    type: DataTypes.STRING,
    unique: true,
    primaryKey: true
  },
  number: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true
  }

})


