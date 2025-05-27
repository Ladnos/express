"use strict";
import bcrypt from 'bcrypt-ts';
import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../database';

class User extends Model {
    declare id: number;
    declare login: string;
    declare password: string;
    declare remember_token: string | null;
    
    async comparePassword(password: string): Promise<boolean> {
      
      return bcrypt.compare(password,this.getDataValue('password'));
    }

    async generateRememberToken(): Promise<string> {
      const crypto = await import('crypto');
      const token = crypto.randomBytes(32).toString('hex');
      this.remember_token = token;
      await this.save();
      return token;
    }
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  getData()
  {
    
  }
  static associate(models: any) {
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
// User.associate({AuthToken})
export default User
