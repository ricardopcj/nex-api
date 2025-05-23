import { Item, ItemCreationAttributes } from "../models/Item";

export interface ItemsRepository {
  create(data: ItemCreationAttributes): Promise<Item>;
  findAll(): Promise<Item[]>;
}
