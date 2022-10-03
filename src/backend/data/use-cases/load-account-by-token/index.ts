
import { AccountModel, Decrypter, LoadAccountByToken, LoadAccountByIdRepository } from "./protocols";

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountById: LoadAccountByIdRepository
  ) { }
  async load(token: string): Promise<AccountModel | null> {
    const tokenDecrypted = await this.decrypter.decrypt(token)
    if (tokenDecrypted) {
      const account = await this.loadAccountById.loadById(tokenDecrypted.id)
      return account
    }
    return null
  }

}