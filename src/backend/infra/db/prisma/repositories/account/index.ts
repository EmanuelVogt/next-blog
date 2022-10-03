import { PrismaClient } from "@prisma/client";
import { AddAccountRepository } from "@data/protocols/db/add-account-repository";
import { LoadAccountByEmailRepository } from "@data/protocols/db/load-account-by-email-repository";
import { UserModel } from "@domain/models/user";
import { AddAccountModel } from "@domain/use-cases/add-account";
import { AccountModel, AuthenticatedAccountModel } from "@domain/models/account";
import { UpdateAccessTokenRepository } from "@data/protocols/db/update-access-token-repository";
import { LoadAccountByIdRepository } from "@data/protocols/db/load-account-by-id-repository";

export class AccountPrismaRepository implements
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByIdRepository {
  private client: PrismaClient
  constructor() {
    this.client = new PrismaClient()
  }
  async loadById(id: string): Promise<AccountModel | null> {
    const user = await this.client.users.findUnique!({
      where: {
        id
      }
    })
    const { accessToken, ...rest } = user!
    if (accessToken) {
      return {
        accessToken,
        ...rest
      }
    }
    return null
  }

  async updateToken(token: string, id: string): Promise<void> {
    await this.client.users.update({ where: { id }, data: { accessToken: token } })
  }

  async loadByEmail(email: string): Promise<AccountModel | null> {
    const user = await this.client.users.findUnique!({
      where: {
        email
      }
    })
    const { accessToken, ...rest } = user!
    if (accessToken) {
      return {
        accessToken,
        ...rest
      }
    }
    return null
  }

  async create(values: AddAccountModel): Promise<UserModel> {
    return await this.client.users.create({ data: { ...values } })
  }
}