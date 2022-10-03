import { AccountModel } from '@/backend/domain/models/account'

export interface LoadAccountById {
  load: (id: string) => Promise<AccountModel | null>
}
