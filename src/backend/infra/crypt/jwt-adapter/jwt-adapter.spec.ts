import jwt from 'jsonwebtoken'
import { Decrypter } from '@data/protocols/criptography/decrypter'
import { Encrypter } from '@data/protocols/criptography/encrypter'
import { JwtAdapter } from './jwt-adapter'
import { vi, describe, expect, test } from 'vitest'

vi.doMock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return await new Promise(resolve => resolve('any_token'))
  },
  async verify(): Promise<string> {
    return await new Promise(resolve => resolve('any_token'))
  }
}))

type SutTypes = {
  sut: Encrypter & Decrypter
}
const secret = ('any_secret')
const makeSut = (): SutTypes => {
  const sut = new JwtAdapter(secret)

  return {
    sut
  }
}
describe('JWT Adapter', () => {
  describe('Encrypt', () => {
    test('should call sign with correct values', async () => {
      const { sut } = makeSut()
      const signSpy = vi.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'any_secret', { expiresIn: 10000000000 })
    })

    test('should return a token on sign success', async () => {
      const { sut } = makeSut()
      vi.spyOn(sut, 'encrypt').mockReturnValueOnce(new Promise(resolve => resolve('any_token')))
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toEqual('any_token')
    })

    test('should throw if sign throws', async () => {
      const { sut } = makeSut()
      vi.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt('any_id')
      void expect(promise).rejects.toThrow()
    })
  })
  describe('Decrypt', () => {
    test('should return an value on verify success', async () => {
      const { sut } = makeSut()
      vi.spyOn(sut, 'decrypt').mockImplementationOnce(async () => {
        return await new Promise((resolve) => resolve('any_token'))
      })
      const accessToken = await sut.decrypt('any_token')
      expect(accessToken).toEqual('any_token')
    })

    test('should throw if verify throws', async () => {
      const { sut } = makeSut()
      vi.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.decrypt('any_token')
      void expect(promise).rejects.toThrow()
    })
  })
})
