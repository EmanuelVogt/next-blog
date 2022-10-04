import { Decrypter } from '@/backend/data/protocols/criptography/decrypter'
import { Encrypter } from '@/backend/data/protocols/criptography/encrypter'
import { LoadAccountByIdRepository } from '@/backend/data/protocols/db/load-account-by-id-repository'
import { UpdateAccessTokenRepository } from '@/backend/data/protocols/db/update-access-token-repository'
import { DbTokenAuthentication } from '@/backend/data/use-cases/token-authentication'
import { AccountModel } from '@/backend/domain/models/account'
import { describe, test, expect, vi } from 'vitest'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(id: string): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new EncrypterStub()
}
const faceAccount: AccountModel = ({
  id: 'any_id',
  email: 'any_email@mail.com',
  name: 'any_name',
  password: 'hashed_password'
})
const makeLoadAccountByIdRepository = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById(id: string): Promise<AccountModel | null> {
      return new Promise(resolve => resolve(faceAccount))
    }
  }
  return new LoadAccountByIdRepositoryStub()
}

const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateToken(token: string, id: string): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }

  return new UpdateAccessTokenRepositoryStub()
}

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<any> {
      return new Promise(resolve => resolve({ id: 'any_id' }))
    }
  }
  return new DecrypterStub()
}
type SutTypes = {
  sut: DbTokenAuthentication
  decrypterStub: Decrypter
  encrypterStub: Encrypter
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const encrypterStub = makeEncrypter()
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepository()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()
  const sut = new DbTokenAuthentication(
    decrypterStub,
    loadAccountByIdRepositoryStub,
    encrypterStub,
    updateAccessTokenRepositoryStub)

  return {
    decrypterStub,
    sut,
    loadAccountByIdRepositoryStub,
    updateAccessTokenRepositoryStub,
    encrypterStub
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

  test('should call LoadAccountByIdRepository with correct values', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const spy = vi.spyOn(loadAccountByIdRepositoryStub, 'loadById')
    await sut.auth('any_token')
    expect(spy).toHaveBeenCalledWith('any_id')
  })

  test('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    vi.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.auth('any_token')
    void expect(promise).rejects.toThrow()
  })

  test('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    vi.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockReturnValueOnce(null!)
    const accessToken = await sut.auth('any_token')
    expect(accessToken).toBe(null)
  })

  test('should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateSpy = vi.spyOn(updateAccessTokenRepositoryStub, 'updateToken')
    await sut.auth('any_token')
    expect(updateSpy).toHaveBeenCalledWith('any_token', 'any_id')
  })

  test('should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    vi.spyOn(updateAccessTokenRepositoryStub, 'updateToken').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.auth('any_token')
    void expect(promise).rejects.toThrow()
  })
})