import { AccountModel, Decrypter, LoadAccountByIdRepository } from '@/backend/data/use-cases/load-account-by-token/protocols'
import { DbLoadAccountByToken } from '@/backend/data/use-cases/load-account-by-token'
import { test, describe, expect, vi } from 'vitest'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const makeLoadAccountByIdRepository = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById(id: string): Promise<AccountModel | null> {
      return new Promise(resolve => resolve(null!))
    }
  }
  return new LoadAccountByIdRepositoryStub()
}

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_value_decrypted'))
    }
  }
  return new DecrypterStub()
}

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepository()
  const decrypterStub = makeDecrypter()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByIdRepositoryStub)
  return { sut, decrypterStub, loadAccountByIdRepositoryStub }
}

describe('DbLoadAccountByToken UseCase', () => {
  test('should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const spy = vi.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(spy).toHaveBeenCalledWith('any_token')
  })

  test('should returns null if Decrypter return null', async () => {
    const { sut, decrypterStub } = makeSut()
    vi.spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load('any_token')
    expect(account).toBeNull()
  })

  test('should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByIdRepositoryStub, decrypterStub } = makeSut()
    vi.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve({ id: 'any_id' })))
    const spy = vi.spyOn(loadAccountByIdRepositoryStub, 'loadById')
    await sut.load('any_token')
    expect(spy).toHaveBeenCalledWith('any_id')
  })

  test('should returns null if LoadAccountByTokenRepository return null', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    vi.spyOn(loadAccountByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load('any_token')
    expect(account).toBeNull()
  })

  test('should returns an account if LoadAccountByTokenRepository returns an account', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    vi.spyOn(loadAccountByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(new Promise(resolve => resolve(makeFakeAccount())))
    const account = await sut.load('any_token')
    expect(account).toEqual(makeFakeAccount())
  })

  test('shoult throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    vi.spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(
        new Promise(resolve => resolve(new Promise((resolve, reject) => reject(new Error())))))
    const promise = sut.load('any_token')
    void expect(promise).rejects.toThrow()
  })

  test('shoult throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    vi.spyOn(loadAccountByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(
        new Promise(resolve => resolve(new Promise((resolve, reject) => reject(new Error())))))
    const promise = sut.load('any_token')
    void expect(promise).rejects.toThrow()
  })
})
