import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Payload {
  role: string;
  sub: string;
}

export function verifyRole(allowedRole: string) {
  return (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      response.status(401).send();
      return;
    }

    const [, token] = authHeader.split(" ");

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as Payload;

      if (!allowedRole.includes(decoded.role)) {
        response.status(403).send();
        return;
      }

      request.user = decoded; // todo: types.d.ts
      next();
    } catch (error) {
      response.status(401).send();
    }
  };
}
