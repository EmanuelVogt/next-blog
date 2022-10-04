import { TokenLoginController } from "@/backend/presentation/controllers/token-login";
import { makeDbTokenAuthentication } from "../../use-cases/db-token-authentication";

export const makeTokenLoginController = (): TokenLoginController => {
  return new TokenLoginController(makeDbTokenAuthentication())
}