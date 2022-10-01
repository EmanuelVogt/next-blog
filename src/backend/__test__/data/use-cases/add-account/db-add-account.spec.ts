import { describe, expect, test, vi } from "vitest";
import { DbAddAccount } from "@data/use-cases/add-account";
import {
  AccountModel,
  AddAccountModel,
  AddAccountRepository,
  Hasher,
  LoadAccountByEmailRepository,
  UserModel
} from "@data/use-cases/add-account/protocols";

interface AccountData {
  name: string
  email: string
  password: string
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async create(values: AddAccountModel): Promise<UserModel> {
      return await new Promise((resolve) => resolve({
        accessToken: 'any_token',
        email: 'any_email@mail.com',
        id: 'any_id'
      }))
    }
  }
  return new AddAccountRepositoryStub()
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail(email: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(null!))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return await new Promise((resolve) => resolve('hashed_password'))
    }
  }
  return new HasherStub()
}

const makeAccountData = (): AccountData => ({
  name: 'valid_name',
  email: 'any_email@mail.com',
  password: 'valid_password'
})

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'valid_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

interface SutTypes {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()

  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
  return {
    sut,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
    hasherStub
  }
}

describe('DbAddAccount', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = vi.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.create(makeFakeAccount())
    void expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = vi.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(new Promise(resolve => resolve(makeFakeAccount())))
    const sutResponse = await sut.create(makeFakeAccount())
    expect(loadSpy).not.toBe(null)
    expect(sutResponse).toBe(null)
  })

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const createSpy = vi.spyOn(addAccountRepositoryStub, 'create')
    await sut.create(makeAccountData())
    expect(createSpy).toHaveBeenCalled()
  })

  test('should throw if AddAcountRepository throws', () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    vi
      .spyOn(addAccountRepositoryStub, 'create')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.create(makeAccountData())
    void expect(promise).rejects.toThrow()
  })

  test('should call Encrtypter with correct password', async () => {
    const { hasherStub, sut } = makeSut()
    const ecnryptSpy = vi.spyOn(hasherStub, 'hash')
    await sut.create(makeAccountData())
    expect(ecnryptSpy).toHaveBeenCalledWith(makeAccountData().password)
  })

  test('should throw if Encrtypter throws', () => {
    const { hasherStub, sut } = makeSut()
    vi
      .spyOn(hasherStub, 'hash')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.create(makeAccountData())
    void expect(promise).rejects.toThrow()
  })

  test('should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.create(makeAccountData())
    expect(account).toEqual({
      id: 'any_id',
      email: 'any_email@mail.com',
      accessToken: 'any_token'
    })
  })
})
