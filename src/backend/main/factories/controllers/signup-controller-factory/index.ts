import { SignUpController } from "@/backend/presentation/controllers/signup-controller";
import { Controller } from "@/backend/presentation/protocols";
import { makeDbAddAccount } from "@/backend/main/factories/use-cases/db-add-account-factory";
import { makeSignupValidationFactory } from "./signup-validation";
import { makeDbAuthentication } from "@/backend/main/factories/use-cases/db-authentication-factory";

export const makeSignUpControllerFactory = (): Controller => {
  return new SignUpController(
    makeSignupValidationFactory(),
    makeDbAddAccount(),
    makeDbAuthentication()
  );
};
