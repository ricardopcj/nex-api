import { Request, Response } from "express";
import { z } from "zod";
import { makeRegisterService } from "../../../services/factories/make-register-service";
import { UserAlreadyExistsError } from "../../../services/errors/user-already-exists-error";

export async function register(request: Request, response: Response) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerService = makeRegisterService();

    await registerService.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      response.status(409).send({ message: error.message });
    }
    throw error;
  }

  response.status(201).send();
}
