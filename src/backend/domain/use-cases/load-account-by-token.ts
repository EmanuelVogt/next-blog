import { AccountModel } from '@domain/models/account'

export interface LoadAccountByToken {
  load: (id: string) => Promise<AccountModel | null>
}
