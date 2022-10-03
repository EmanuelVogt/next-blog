import { AuthMiddleware } from "@presentation/middlewares/auth-middleware"
import { makeDbLoadAccoubtByToken } from "../use-cases/db-load-account-by-token-factory"

export const makeAuthMiddleware = () => {
  return new AuthMiddleware(makeDbLoadAccoubtByToken())
} 