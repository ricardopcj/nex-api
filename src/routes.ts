import { Response, Application } from "express";

import { verifyJwt } from "./http/middlewares/verify-jwt";
import { verifyRole } from "./http/middlewares/verify-role";

import { register } from "./http/controllers/users/register.controller";
import { authenticate } from "./http/controllers/users/authenticate.controller";
import { signOut } from "./http/controllers/users/singout.controller";
import { createItem } from "./http/controllers/items/create-item.controller";
import { listItems } from "./http/controllers/items/list-items.controller";

export default function routes(app: Application) {
  app.get("/", (_, response: Response) => {
    response.status(200).send();
  });

  app.post("/users", register);
  app.post("/sessions", authenticate);
  app.post("/signout", verifyJwt, signOut);

  app.get("/items", verifyJwt, listItems);

  app.post("/items", verifyRole("ADMIN"), createItem);
}
