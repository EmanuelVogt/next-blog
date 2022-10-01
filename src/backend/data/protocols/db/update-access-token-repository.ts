import { AccountModel } from '@domain/models/account'

export interface UpdateAccessTokenRepository {
  update: (token: string, id: string) => Promise<void>
}
