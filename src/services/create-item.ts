import { Item } from "../models/Item";
import { ItemsRepository } from "../repositories/items-repository";

interface CreateItemServiceRequest {
  name: string;
}

interface CreateItemServiceResponse {
  item: Item;
}

export class CreateItemService {
  constructor(private itemsRepository: ItemsRepository) {}

  async execute({
    name,
  }: CreateItemServiceRequest): Promise<CreateItemServiceResponse> {
    const item = await this.itemsRepository.create({
      name,
    });

    return { item };
  }
}
