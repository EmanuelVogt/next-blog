import { AccountModel } from '@domain/models/account'

export interface LoadAccountByTokenRepository {
  loadByToken: (id: string) => Promise<AccountModel | null>
}
