import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_journaled: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  streak: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});
await User.sync();

export default User;
