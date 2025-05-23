import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import dotenv from "dotenv";
import { InvalidCredentialsError } from "../../../services/errors/invalid-credentials-error";
import { makeAuthenticateService } from "../../../services/factories/make-authenticate-service";

dotenv.config();

export async function authenticate(request: Request, response: Response) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateService = makeAuthenticateService();

    const { user } = await authenticateService.execute({
      email,
      password,
    });

    const token = jwt.sign(
      { role: user.getDataValue("role") },
      process.env.JWT_SECRET as string,
      {
        subject: user.getDataValue("id"),
        expiresIn: "7d",
      }
    );

    response.status(200).send({
      token,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      response.status(400).send({ message: error.message });
    }
    throw error;
  }
}
