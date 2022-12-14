import { DbAuthentication } from '@/backend/data/use-cases/authentication'
import { JwtAdapter } from '@/backend/infra/crypt/jwt-adapter/jwt-adapter'
import { BcryptAdapter } from '@/backend/infra/crypt/bcrypt-adapter/bcrypt-adapter'
import { AccountPrismaRepository } from '@/backend/infra/db/prisma/repositories/account'
import { jwtSecret } from '../../config/env'

export const makeDbAuthentication = (): DbAuthentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(jwtSecret)
  const accountPrismaRepository = new AccountPrismaRepository()

  return new DbAuthentication(
    accountPrismaRepository,
    bcryptAdapter,
    jwtAdapter,
    accountPrismaRepository
  )
}
