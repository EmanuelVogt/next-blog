import { AccountModel } from '@domain/models/account'

export interface UpdateAccessTokenRepository {
  updateToken: (token: string, id: string) => Promise<void>
}
