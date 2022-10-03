import { DbAddAccount } from '@/backend/data/use-cases/add-account'
import { BcryptAdapter } from '@/backend/infra/crypt/bcrypt-adapter/bcrypt-adapter'
import { AccountPrismaRepository } from '@/backend/infra/db/prisma/repositories/account'

export const makeDbAddAccount = (): DbAddAccount => {
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountPrismaRepository()
  return new DbAddAccount(encrypter, accountMongoRepository, accountMongoRepository)
}
