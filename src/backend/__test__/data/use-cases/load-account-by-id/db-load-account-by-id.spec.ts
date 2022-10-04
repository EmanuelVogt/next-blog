import { AccountModel, LoadAccountByIdRepository } from '@/backend/data/use-cases/load-account-by-id/protocols'
import { DbLoadAccountById } from '@/backend/data/use-cases/load-account-by-id'
import { test, describe, expect, vi } from 'vitest'
const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const makeLoadAccountByIdRepository = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById (id: string): Promise<AccountModel | null> {
      return new Promise(resolve => resolve(null!))
    }
  }
  return new LoadAccountByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadAccountById
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepository()
  const sut = new DbLoadAccountById( loadAccountByIdRepositoryStub)
  return { sut, loadAccountByIdRepositoryStub }
}

describe('DbLoadAccountById UseCase', () => {
  test('should call LoadAccountByIdRepository with correct values', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const spy = vi.spyOn(loadAccountByIdRepositoryStub, 'loadById')
    await sut.load('any_token')
    expect(spy).toHaveBeenCalledWith('any_token')
  })

  test('should returns null if LoadAccountByIdRepository return null', async () => {
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

  test('shoult throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    vi.spyOn(loadAccountByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(
        new Promise(resolve => resolve(new Promise((resolve, reject) => reject(new Error())))))
    const promise = sut.load('any_token')
    void expect(promise).rejects.toThrow()
  })
})
