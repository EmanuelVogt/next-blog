
import { AccountModel, Decrypter, LoadAccountById, LoadAccountByIdRepository } from "./protocols";

export class DbLoadAccountById implements LoadAccountById {
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