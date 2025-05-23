import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export interface ItemAttributes {
  id: string;
  name: string;
}

export interface ItemCreationAttributes
  extends Optional<ItemAttributes, "id"> {}

export class Item extends Model<ItemAttributes, ItemCreationAttributes> {}

Item.init(
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
  },
  {
    sequelize,
    tableName: "items",
    timestamps: false,
  }
);
