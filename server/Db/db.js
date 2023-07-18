import { Sequelize } from "sequelize";
export default new Sequelize('march','root','zerovalo', {dialect: 'mysql', host: 'localhost'});