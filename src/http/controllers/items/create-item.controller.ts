import { Request, Response } from "express";
import { z } from "zod";
import { makeItemService } from "../../../services/factories/make-item-service";
import { ItemAlreadyExistsError } from "../../../services/errors/item-already-existis-error";

const itemService = makeItemService();
export async function createItem(request: Request, response: Response) {
  const itemBodySchema = z.object({
    name: z.string(),
  });

  const { name } = itemBodySchema.parse(request.body);

  try {
    await itemService.execute({
      name,
    });
  } catch (error) {
    if (error instanceof ItemAlreadyExistsError) {
      response.status(409).send({ message: error.message });
    }
    throw error;
  }

  response.status(201).send();
}
