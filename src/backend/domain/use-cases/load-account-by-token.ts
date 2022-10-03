import { AccountModel } from '@/backend/domain/models/account'

export interface LoadAccountByToken {
  load: (id: string) => Promise<AccountModel | null>
}
