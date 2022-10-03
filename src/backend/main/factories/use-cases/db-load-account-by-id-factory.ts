import { DbLoadAccountById } from "@data/use-cases/load-account-by-id"
import { JwtAdapter } from "@infra/crypt/jwt-adapter/jwt-adapter"
import { AccountPrismaRepository } from "@infra/db/prisma/repositories/account"
import { jwtSecret } from '@main/config/env'

export const makeDbLoadAccoubtById = () => {
  const decrypt = new JwtAdapter(jwtSecret)
  const loadAccountByIdRepository = new AccountPrismaRepository() 
  return new DbLoadAccountById(decrypt, loadAccountByIdRepository)
}