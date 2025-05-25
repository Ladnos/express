import { Model, DataTypes } from 'sequelize';
import sequelize from '../../database';

class OAuthToken extends Model {
  public id!: number;
  public userId!: number;
  public accessToken!: string;
  public refreshToken!: string;
  public expiresAt!: Date;
}

OAuthToken.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'OAuthToken',
    tableName: 'oauth_tokens',
    timestamps: false,
  }
);

export default OAuthToken;
