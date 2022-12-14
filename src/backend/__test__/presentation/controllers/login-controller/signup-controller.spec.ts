import {
  AuthenticatedAccountModel,
  Authentication,
  AuthenticationModel,
  HttpRequest,
  Validation
} from '@/backend/presentation/controllers/login-controller/protocols'
import { MissingParamError } from '@/backend/presentation/errors'
import { badRequest, unautorized, serverError, ok } from '@/backend/presentation/helpers/http'
import { LoginController } from '@/backend/presentation/controllers/login-controller'
import { describe, test, expect, vi } from 'vitest'

const fakeAuthenticatedAccountModel = (): AuthenticatedAccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  accessToken: 'any_access_token'
})
const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null!
    }
  }
  return new ValidationStub()
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth ({ email, password }: AuthenticationModel): Promise<AuthenticatedAccountModel> {
      return await new Promise(resolve => resolve(fakeAuthenticatedAccountModel()))
    }
  }

  return new AuthenticationStub()
}

type SutTypes = {
  fakeError: Error
  httpRequest: HttpRequest
  sut: LoginController
  authenticationStub: Authentication
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication()
  const validationStub = makeValidation()
  const sut = new LoginController(authenticationStub, validationStub)
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  const httpRequest = {
    body: {
      email: 'any_email@email.com',
      password: 'any_password'
    }
  }
  return {
    validationStub,
    fakeError,
    httpRequest,
    sut,
    authenticationStub
  }
}
describe('login controller', () => {
  test('should return Unautorized with 401 if invalid credentials are provided', async () => {
    const { sut, httpRequest, authenticationStub } = makeSut()
    vi.spyOn(authenticationStub, 'auth').mockImplementationOnce(
      async () => await new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(unautorized())
  })

  test('should call Authentication with correct values', async () => {
    const { sut, httpRequest, authenticationStub } = makeSut()
    const authSpy = vi.spyOn(authenticationStub, 'auth')
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith({ email: 'any_email@email.com', password: 'any_password' })
  })

  test('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub, httpRequest } = makeSut()
    vi.spyOn(authenticationStub, 'auth').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 if Authentication succeed', async () => {
    const { sut, httpRequest } = makeSut()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({ account: fakeAuthenticatedAccountModel() }))
  })

  test('should call Validation with correct values', async () => {
    const { sut, validationStub, httpRequest } = makeSut()
    const validateSpy = vi.spyOn(validationStub, 'validate')
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('should return 400 if valididation return an error', async () => {
    const { sut, validationStub, httpRequest } = makeSut()
    vi.spyOn(validationStub, 'validate').mockReturnValue(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
