import { AuthenticatedAccountModel } from '@/backend/domain/models/account';
import { TokenAuthentication } from '@/backend/domain/use-cases/token-authentication';
import { TokenLoginController } from '@/backend/presentation/controllers/token-login';
import { MissingParamError } from '@/backend/presentation/errors';
import { badRequest, serverError } from '@/backend/presentation/helpers/http';
import { HttpRequest } from '@/backend/presentation/protocols';
import { describe, test, vi, expect } from 'vitest'

const makeFakeHttpRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

const makeTokenLogin = (): TokenAuthentication => {
  class TokenAuthenticationStub implements TokenAuthentication {
    async auth(token: string): Promise<AuthenticatedAccountModel> {
      return new Promise(resolve => resolve({
        accessToken: 'any_token',
        email: 'any_email',
        id: 'any_id',
        name: 'any_name'
      }))
    }
  }
  return new TokenAuthenticationStub()
}

type SutTypes = {
  sut: TokenLoginController
  tokenAuthenticationStub: TokenAuthentication
  fakeHttpRequest: HttpRequest
}

const makeSut = (): SutTypes => {
  const tokenAuthenticationStub = makeTokenLogin()
  const sut = new TokenLoginController(tokenAuthenticationStub)
  const fakeHttpRequest = makeFakeHttpRequest()
  return {
    sut,
    tokenAuthenticationStub,
    fakeHttpRequest
  }
}
describe('TokenLoginController', () => {
  test('should return 400 if no token is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(badRequest(new MissingParamError('token')))
  })

  test('should call TokenAuthentication with correct value', async () => {
    const { sut, tokenAuthenticationStub, fakeHttpRequest } = makeSut()
    const spy = vi.spyOn(tokenAuthenticationStub, 'auth')
    await sut.handle(fakeHttpRequest)
    expect(spy).toHaveBeenCalledWith('any_token')
  });

  test('should return 401 if TokenAuthentication fails', async () => {
    const { sut, tokenAuthenticationStub, fakeHttpRequest } = makeSut()
    vi.spyOn(tokenAuthenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null!)))
    const httpResponse = await sut.handle(fakeHttpRequest)
    expect(httpResponse.statusCode).toEqual(401)
  })

  test('should return 500 if Authentication throws', async () => {
    const { sut, tokenAuthenticationStub, fakeHttpRequest } = makeSut()
    //@ts-ignore
    vi.spyOn(tokenAuthenticationStub, 'auth').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(fakeHttpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
});