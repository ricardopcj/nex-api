import { User } from "../models/User";
import { compare } from "bcryptjs";
import { UsersRepository } from "../repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  user: User;
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new InvalidCredentialsError();

    const doesPasswordMatches = compare(
      password,
      user.getDataValue("password")
    );

    if (!doesPasswordMatches) throw new InvalidCredentialsError();

    return { user };
  }
}
