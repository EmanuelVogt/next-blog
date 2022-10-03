import { AccessDenied } from '@presentation/errors'
import { forbidden, ok } from '@presentation/helpers/http'

import { AuthMiddleware } from '@presentation/middlewares/auth-middleware'
import { LoadAccountByToken, HttpRequest, AccountModel } from '@presentation/middlewares/protocols'
import {describe, test, expect, vi } from 'vitest'

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByIdStub: LoadAccountByToken
}

const makeFakeHttpRequest = (): HttpRequest => {
  return {
    headers: {
      'x-access-token': 'any_token'
    }
  }
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const makeLoadAccountById = (): LoadAccountByToken => {
  class LoadAccountByIdStub implements LoadAccountByToken {
    async load (id: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new LoadAccountByIdStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByIdStub = makeLoadAccountById()
  const sut = new AuthMiddleware(loadAccountByIdStub)
  return { sut, loadAccountByIdStub }
}
describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDenied()))
  })

  test('should call LoadAccountById with correct value', async () => {
    const { sut, loadAccountByIdStub } = makeSut()
    const loadSpy = vi.spyOn(loadAccountByIdStub, 'load')
    await sut.handle(makeFakeHttpRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })

  test('should return 403 if LoadAccountById returns null', async () => {
    const { sut, loadAccountByIdStub } = makeSut()
    vi.spyOn(loadAccountByIdStub, 'load')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDenied()))
  })

  test('should return 200 if LoadAccountById return an account', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(ok({ accountId: makeFakeAccount().id }))
  })

  test('should return 500 if LoadAccountById throws', async () => {
    const { sut, loadAccountByIdStub } = makeSut()
    vi.spyOn(loadAccountByIdStub, 'load')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(forbidden(new Error()))
  })
})
