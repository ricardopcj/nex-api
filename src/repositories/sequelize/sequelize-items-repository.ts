import { Item, ItemCreationAttributes } from "../../models/Item";
import { ItemsRepository } from "../items-repository";

export class SequelizeItemsRepository implements ItemsRepository {
  async create(data: ItemCreationAttributes): Promise<Item> {
    return Item.create(data);
  }

  async findAll(): Promise<Item[]> {
    return await Item.findAll();
  }
}
