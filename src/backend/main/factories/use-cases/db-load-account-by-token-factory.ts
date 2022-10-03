import { DbLoadAccountByToken } from "@/backend/data/use-cases/load-account-by-token"
import { JwtAdapter } from "@/backend/infra/crypt/jwt-adapter/jwt-adapter"
import { AccountPrismaRepository } from "@/backend/infra/db/prisma/repositories/account"
import { jwtSecret } from '@/backend/main/config/env'

export const makeDbLoadAccoubtByToken = () => {
  const decrypt = new JwtAdapter(jwtSecret)
  const loadAccountByIdRepository = new AccountPrismaRepository() 
  return new DbLoadAccountByToken(decrypt, loadAccountByIdRepository)
}