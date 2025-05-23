import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";
import bcrypt from "bcryptjs";

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

export class User extends Model<UserAttributes, UserCreationAttributes> {
  public async checkPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.getDataValue("password"));
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("USER", "ADMIN"),
      allowNull: false,
      defaultValue: "USER",
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    updatedAt: false,
    underscored: true,
    hooks: {
      beforeCreate: async (user: User) => {
        const plainPassword = user.getDataValue("password");
        const hash = await bcrypt.hash(plainPassword, 8);
        user.setDataValue("password", hash);
      },
    },
  }
);
