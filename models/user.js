"use strict";
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database.js')

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  getData()
  {
    
  }
  static associate(models) {
    // define association here
  }
}
User.init(
  {
    login: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value, salt);

        this.setDataValue("password", hash);
      },
      get()
      {
        return '************************'
      }
    },
      remember_token: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
    tableName: 'users',
  }
);
module.exports = User
