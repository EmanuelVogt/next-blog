
import { AccountModel, LoadAccountById, LoadAccountByIdRepository } from "./protocols";

export class DbLoadAccountById implements LoadAccountById {
  constructor(
    private readonly loadAccountById: LoadAccountByIdRepository
  ) { }
  async load(id: string): Promise<AccountModel | null> {
      return await this.loadAccountById.loadById(id)
  }
}