import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('rrhh', 'root', 'vicen', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;