import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const db_name = 'socialexpressy';
const db_username = 'root';
const db_password = process.env.DB_PASSWORD;
const local_host = '127.0.0.1';

const sequelize = new Sequelize(db_name, db_username, db_password, {
  host: local_host,
  dialect: 'mysql',
});

export default sequelize;
