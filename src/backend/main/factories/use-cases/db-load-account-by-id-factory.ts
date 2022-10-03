import { DbLoadAccountById } from "@/backend/data/use-cases/load-account-by-id"
import { AccountPrismaRepository } from "@/backend/infra/db/prisma/repositories/account"

export const makeDbLoadAccoubtById = () => {
  const loadAccountByIdRepository = new AccountPrismaRepository() 
  return new DbLoadAccountById(loadAccountByIdRepository)
}