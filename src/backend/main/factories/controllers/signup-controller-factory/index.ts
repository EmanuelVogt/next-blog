import { SignUpController } from "@presentation/controllers/signup-controller";
import { Controller } from "@presentation/protocols";
import { makeDbAddAccount } from "@main/factories/use-cases/db-add-account-factory";
import { makeSignupValidationFactory } from "./signup-validation";
import { makeDbAuthentication } from "@main/factories/use-cases/db-authentication-factory";

export const makeSignUpControllerFactory = (): Controller => {
  return new SignUpController(
    makeSignupValidationFactory(),
    makeDbAddAccount(),
    makeDbAuthentication()
  );
};
