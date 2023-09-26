import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('venta_celulares','root','root',{
  host:'localhost',
  dialect:'mysql',
});

export default sequelize;