import { Request, Response } from "express";

export async function signOut(request: Request, response: Response) {
  try {
    response.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
  } catch (error) {
    response.status(500).send();
    throw error;
  }

  response.sendStatus(200);
}
