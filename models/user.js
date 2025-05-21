"use strict";
const bcrypt = require('bcrypt');
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      login: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          console.log(value);
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(value, salt);

          this.setDataValue("password", hash);
        }
      },
        remember_token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
