import { PrismaClient } from "@prisma/client";
import { AddAccountRepository } from "@data/protocols/db/add-account-repository";
import { LoadAccountByEmailRepository } from "@data/protocols/db/load-account-by-email-repository";
import { UserModel } from "@domain/models/user";
import { AddAccountModel } from "@domain/use-cases/add-account";
import { AccountModel } from "@domain/models/account";
import { UpdateAccessTokenRepository } from "@data/protocols/db/update-access-token-repository";

export class AccountPrismaRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  private client: PrismaClient
  constructor() {
    this.client = new PrismaClient()
  }

  async update(token: string, id: string): Promise<void> {
    await this.client.users.update({ where: { id }, data: { accessToken: token } })
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const user = await this.client.users.findUnique({
      where: {
        email
      }
    })
    return user!
  }

  async create(values: AddAccountModel): Promise<UserModel> {
    return await this.client.users.create({ data: { ...values } })
  }
}