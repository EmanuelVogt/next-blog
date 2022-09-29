import { test, describe, expect, vi} from 'vitest'
import { SignUpController } from '.'
import { AccountModel, HttpRequest, Validation } from './protocols'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid@email.com',
  password: 'valid_password',
  accessToken: 'any_token'
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return new Error()
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: SignUpController
  httpRequest: HttpRequest
  validationStub: Validation
}
const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new SignUpController(validationStub)
  const httpRequest = { body: makeFakeAccount() }
  return {
    sut,
    httpRequest,
    validationStub
  }
}

describe('signup controller', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub, httpRequest } = makeSut()
    const validateSpy = vi.spyOn(validationStub, 'validate')
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})