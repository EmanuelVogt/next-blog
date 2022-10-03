import { AccountModel } from "@/backend/domain/models/account"

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<AccountModel | null>
}
