import { badRequest, serverError } from '@presentation/helpers/http'
import { MissingParamError } from '@presentation/errors'
import { test, describe, expect, vi } from 'vitest'
import { SignUpController } from '.'
import { AccountModel, AddAccount, AddAccountModel, HttpRequest, UserModel, Validation } from './protocols'

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
}
const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(validationStub, addAccountStub)
  const httpRequest = { body: makeFakeAccount() }
  return {
    sut,
    httpRequest,
    validationStub,
    addAccountStub
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
      return await new Promise((_, reject) => reject( new Error()))
    })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})