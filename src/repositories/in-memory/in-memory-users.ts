import type { User } from "generated/prisma/client.ts";
import type { UserCreateInput } from "generated/prisma/models.ts";
import { randomUUID } from "node:crypto";
import type { IUsersRepository } from "../IUser.ts";

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = [];

  async create(data: UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
