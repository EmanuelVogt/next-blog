import { AccountModel } from '@/backend/domain/models/account'

export interface LoadAccountByIdRepository {
  loadById: (id: string) => Promise<AccountModel | null>
}
