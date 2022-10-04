import { JwtAdapter } from '@/backend/infra/crypt/jwt-adapter/jwt-adapter'
import { BcryptAdapter } from '@/backend/infra/crypt/bcrypt-adapter/bcrypt-adapter'
import { AccountPrismaRepository } from '@/backend/infra/db/prisma/repositories/account'
import { jwtSecret } from '../../config/env'
import { DbTokenAuthentication } from '@/backend/data/use-cases/token-authentication'

export const makeDbTokenAuthentication = (): DbTokenAuthentication => {
  const jwtAdapter = new JwtAdapter(jwtSecret)
  const accountPrismaRepository = new AccountPrismaRepository()
  
  return new DbTokenAuthentication(
    jwtAdapter,
    accountPrismaRepository,
    jwtAdapter,
    accountPrismaRepository
  )
}
