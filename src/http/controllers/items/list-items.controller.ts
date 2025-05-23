import { Request, Response } from "express";
import { makeListItemsService } from "../../../services/factories/make-list-items-service";

export async function listItems(request: Request, response: Response) {
  try {
    const listItemsService = makeListItemsService();

    const { items } = await listItemsService.execute();

    response.json(items);
  } catch (error) {
    response.status(500).send();
    throw error;
  }
}
