import { badRequest, forbidden, ok, serverError } from '@/backend/presentation/helpers/http'
import { ForbidenError, MissingParamError } from '@/backend/presentation/errors'
import { test, describe, expect, vi } from 'vitest'
import { SignUpController } from '@/backend/presentation/controllers/signup-controller'
import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  AuthenticatedAccountModel,
  Authentication,
  AuthenticationModel,
  HttpRequest,
  UserModel,
  Validation
} from '@/backend/presentation/controllers/signup-controller/protocols'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid@email.com',
  password: 'valid_password',
  accessToken: 'any_token'
})

const makeFakeUser = (): UserModel => ({
  accessToken: 'any_accessToken',
  email: 'any_email@mail.com',
  id: 'any_id',
})

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth({ email, password }: AuthenticationModel): Promise<AuthenticatedAccountModel> {
      return await new Promise(resolve => resolve({
        id: 'any_id',
        name: 'any_name',
        email: "any_email@mail.com",
        accessToken: 'any_token'
      }))
    }
  }

  return new AuthenticationStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async create(account: AddAccountModel): Promise<UserModel> {
      return new Promise(resolve => resolve(makeFakeUser()))
    }

  }
  return new AddAccountStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      //@ts-ignore
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: SignUpController
  httpRequest: HttpRequest
  validationStub: Validation
  addAccountStub: AddAccount
  authenticationStub: Authentication
}
const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addAccountStub = makeAddAccount()
  const authenticationStub = makeAuthentication()
  const sut = new SignUpController(validationStub, addAccountStub, authenticationStub)
  const httpRequest = { body: makeFakeAccount() }
  return {
    sut,
    httpRequest,
    validationStub,
    addAccountStub,
    authenticationStub
  }
}

describe('signup controller', () => {
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

  test('should call AddAccount with correct values', async () => {
    const { sut, addAccountStub, httpRequest } = makeSut()
    const addSpy = vi.spyOn(addAccountStub, 'create')
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid@email.com',
      password: 'valid_password',
    })
  })

  test('should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub, httpRequest } = makeSut()
    //@ts-ignore
    vi.spyOn(addAccountStub, 'create').mockImplementationOnce(async () => {
      return await new Promise((_, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub, httpRequest } = makeSut()
    vi.spyOn(addAccountStub, 'create').mockReturnValueOnce(
      new Promise(resolve => resolve(null!)))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new ForbidenError()))
  })

  test('should call Authentication with correct values', async () => {
    const { sut, httpRequest, authenticationStub } = makeSut()
    const authSpy = vi.spyOn(authenticationStub, 'auth')
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith({ email: 'valid@email.com', password: 'valid_password' })
  })

  test('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub, httpRequest } = makeSut()
    //@ts-ignore
    vi.spyOn(authenticationStub, 'auth').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut, httpRequest } = makeSut()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      accessToken: "any_token",
      email: "any_email@mail.com",
      id: "any_id",
    }))
  })
})