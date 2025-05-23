import { Item } from "../models/Item";
import { ItemsRepository } from "../repositories/items-repository";

interface ListItemsServiceResponse {
  items: Item[];
}

export class ListItemsService {
  constructor(private itemsRepository: ItemsRepository) {}

  async execute(): Promise<ListItemsServiceResponse> {
    const items = await this.itemsRepository.findAll();

    return { items };
  }
}
