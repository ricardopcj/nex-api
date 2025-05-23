import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function verifyJwt(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    response.status(401).send();
    return;
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    request.user = decoded; // todo: types.d.ts

    return next();
  } catch (error) {
    response.status(401).send();
  }
}
