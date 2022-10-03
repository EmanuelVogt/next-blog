import { AuthMiddleware } from "@presentation/middlewares/auth-middleware"
import { makeDbLoadAccoubtById } from "../use-cases/db-load-account-by-id-factory"

export const makeAuthMiddleware = () => {
  return new AuthMiddleware(makeDbLoadAccoubtById())
} 