import { SequelizeItemsRepository } from "../../repositories/sequelize/sequelize-items-repository";
import { ListItemsService } from "../list-items";

export function makeListItemsService() {
  const itemsRepository = new SequelizeItemsRepository();
  const service = new ListItemsService(itemsRepository);

  return service;
}
