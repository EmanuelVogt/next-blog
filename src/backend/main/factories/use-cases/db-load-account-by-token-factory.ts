import { DbLoadAccountByToken } from "@data/use-cases/load-account-by-token"
import { JwtAdapter } from "@infra/crypt/jwt-adapter/jwt-adapter"
import { AccountPrismaRepository } from "@infra/db/prisma/repositories/account"
import { jwtSecret } from '@main/config/env'

export const makeDbLoadAccoubtByToken = () => {
  const decrypt = new JwtAdapter(jwtSecret)
  const loadAccountByIdRepository = new AccountPrismaRepository() 
  return new DbLoadAccountByToken(decrypt, loadAccountByIdRepository)
}