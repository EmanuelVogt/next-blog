import { badRequest } from '@presentation/helpers/http'
import { MissingParamError } from '@presentation/errors'
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

  test('should return 400 if valididation return an error', async () => {
    const { sut, validationStub, httpRequest } = makeSut()
    vi.spyOn(validationStub, 'validate').mockReturnValue(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})