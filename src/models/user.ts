"use strict";
import bcrypt from 'bcrypt-ts';
import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../database';

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  getData()
  {
    
  }
  static associate(models: Model[]) {
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
      set(value: string) {
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
export default User
