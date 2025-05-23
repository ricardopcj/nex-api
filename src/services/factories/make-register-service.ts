import { SequelizeUsersRepository } from "../../repositories/sequelize/sequelize-user-repository";
import { RegisterService } from "../register";

export function makeRegisterService() {
  const usersRepository = new SequelizeUsersRepository();
  const service = new RegisterService(usersRepository);

  return service;
}
