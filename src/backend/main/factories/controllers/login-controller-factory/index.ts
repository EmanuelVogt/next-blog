
import { LoginController } from '@/backend/presentation/controllers/login-controller'
import { Controller } from '@/backend/presentation/protocols'
import { makeLoginValidationFactory } from './login-validation'
import { makeDbAuthentication } from '@/backend/main/factories/use-cases/db-authentication-factory'

export const makeLoginController = (): Controller => {
  return new LoginController(makeDbAuthentication(), makeLoginValidationFactory())
}
