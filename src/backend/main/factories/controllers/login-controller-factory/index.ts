
import { LoginController } from '@presentation/controllers/login-controller'
import { Controller } from '@presentation/protocols'
import { makeLoginValidationFactory } from '@main/factories/controllers/login-controller-factory/login-validation'
import { makeDbAuthentication } from '@main/factories/use-cases/db-authentication-factory'

export const makeLoginController = (): Controller => {
  return new LoginController(makeDbAuthentication(), makeLoginValidationFactory())
}
