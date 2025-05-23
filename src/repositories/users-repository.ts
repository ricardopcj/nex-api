import { User, UserCreationAttributes } from "../models/User";

export interface UsersRepository {
  create(data: UserCreationAttributes): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
