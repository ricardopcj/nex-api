import { SequelizeUsersRepository } from "../../repositories/sequelize/sequelize-user-repository";
import { AuthenticateService } from "../authenticate";

export function makeAuthenticateService() {
  const usersRepository = new SequelizeUsersRepository();
  const service = new AuthenticateService(usersRepository);

  return service;
}
