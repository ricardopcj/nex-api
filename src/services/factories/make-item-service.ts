import { SequelizeItemsRepository } from "../../repositories/sequelize/sequelize-items-repository";
import { CreateItemService } from "../create-item";

export function makeItemService() {
  const itemsRepository = new SequelizeItemsRepository();
  const service = new CreateItemService(itemsRepository);

  return service;
}
