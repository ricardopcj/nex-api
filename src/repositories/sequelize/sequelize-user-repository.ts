import { User, UserCreationAttributes } from "../../models/User";
import { UsersRepository } from "../users-repository";

export class SequelizeUsersRepository implements UsersRepository {
  async create(data: UserCreationAttributes): Promise<User> {
    return User.create(data);
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: {
        email,
      },
    });
  }
}
