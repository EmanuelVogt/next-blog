import { DbLoadAccountById } from "@data/use-cases/load-account-by-id"
import { AccountPrismaRepository } from "@infra/db/prisma/repositories/account"

export const makeDbLoadAccoubtById = () => {
  const loadAccountByIdRepository = new AccountPrismaRepository() 
  return new DbLoadAccountById(loadAccountByIdRepository)
}