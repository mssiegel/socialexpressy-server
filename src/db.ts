import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

let db_name: string;
let db_username: string;
let db_password: string;
let db_host: string;
let db_port: number;
if (process.env.NODE_ENV === 'development') {
  db_name = 'socialexpressy';
  db_username = 'root';
  db_password = process.env.DB_DEV_PASSWORD as string;
  db_host = '127.0.0.1'; // local host
  db_port = 3306;
} else {
  db_name = 'defaultdb';
  db_username = 'avnadmin';
  db_password = process.env.DB_PROD_PASSWORD as string;
  db_host = 'socialexpressy-socialexpressy.a.aivencloud.com';
  db_port = 18739;
}

const sequelize = new Sequelize(db_name, db_username, db_password, {
  host: db_host,
  dialect: 'mysql',
  port: db_port,
  ssl: true,
});

try {
  await sequelize.authenticate();
  console.log('Database connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize;
