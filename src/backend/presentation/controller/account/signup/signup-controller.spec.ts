import { test, describe, expect } from 'vitest'
import { SignUpController } from '.'
import { AccountModel, HttpRequest } from './protocols'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid@email.com',
  password: 'valid_password',
  accessToken: 'any_token'
})

type SutTypes = {
  sut: SignUpController
  httpRequest: HttpRequest
}
const makeSut = (): SutTypes => {
  const sut = new SignUpController()
  const httpRequest: HttpRequest = { body: makeFakeAccount() }

  return {
    sut,
    httpRequest
  }
}
describe('signup controller', () => {
  test('returns correctly values of sut', async () => {
    const { sut, httpRequest } = makeSut()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({ body: '', statusCode: 400 })
  })
})