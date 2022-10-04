import { Decrypter } from '@/backend/data/protocols/criptography/decrypter'
import { DbTokenAuthentication } from '@/backend/data/use-cases/token-authentication'
import { describe, test, expect, vi } from 'vitest'

type SutTypes = {
  sut: DbTokenAuthentication
  decrypterStub: Decrypter
}

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<any> {
      return new Promise(resolve => resolve('any_decrypted_token'))
    }
  }
  return new DecrypterStub()
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const sut = new DbTokenAuthentication(decrypterStub)
  return {
    decrypterStub,
    sut
  }
}

describe('DbTokenAuthentication UseCase', () => {
  test('should call Decrypter with correct token', async () => {
    const { sut, decrypterStub } = makeSut()
    const spy = vi.spyOn(decrypterStub, 'decrypt')
    await sut.auth('any_token')
    expect(spy).toHaveBeenCalledWith('any_token')
  })

  test('should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    vi.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.auth('any_token')
    void expect(promise).rejects.toThrow()
  })

  test('should returns null if Decrypter return null', async () => {
    const { sut, decrypterStub } = makeSut()
    vi.spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.auth('any_token')
    expect(account).toBeNull()
  })

})