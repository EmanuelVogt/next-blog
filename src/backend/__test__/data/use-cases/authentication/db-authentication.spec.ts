import {
  AuthenticationModel,
  HashComparer,
  LoadAccountByEmailRepository,
  Encrypter,
  UpdateAccessTokenRepository,
  AccountModel
} from '@/backend/data/use-cases/authentication/protocols'
import { DbAuthentication } from '@/backend/data/use-cases/authentication'
import { describe, test, expect, vi } from 'vitest'
const faceAccount: AccountModel = ({
  id: 'any_id',
  email: 'any_email@mail.com',
  name: 'any_name',
  password: 'hashed_password'
})

const fakeAuthentication: AuthenticationModel = ({ email: 'any_email@mail.com', password: 'any_password' })

const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateToken (token: string, id: string): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }

  return new UpdateAccessTokenRepositoryStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new EncrypterStub()
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(faceAccount))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeHashCompare = (): HashComparer => {
  class HasComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
  return new HasComparerStub()
}

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()
  const hashComparerStub = makeHashCompare()
  const encrypterStub = makeEncrypter()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub, encrypterStub, updateAccessTokenRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = vi.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(fakeAuthentication)
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    vi.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.auth(fakeAuthentication)
    void expect(promise).rejects.toThrow()
  })

  test('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    vi.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null!)
    const accessToken = await sut.auth(fakeAuthentication)
    expect(accessToken).toBe(null)
  })

  test('should call HashCompare with correct password', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = vi.spyOn(hashComparerStub, 'compare')
    await sut.auth(fakeAuthentication)
    expect(compareSpy).not.toHaveBeenCalledWith('wrong_password', 'hashed_password')
    expect(compareSpy).not.toHaveBeenCalledWith('any_password', 'wrong_hashed_password')
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('should throw if HashCompare throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    vi.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.auth(fakeAuthentication)
    void expect(promise).rejects.toThrow()
  })

  test('should return null if HashCompare returns null', async () => {
    const { sut, hashComparerStub } = makeSut()
    vi.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const accessToken = await sut.auth(fakeAuthentication)
    expect(accessToken).toBe(null)
  })

  test('should call TokenGenerator with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const compareSpy = vi.spyOn(encrypterStub, 'encrypt')
    await sut.auth(fakeAuthentication)
    expect(compareSpy).not.toHaveBeenCalledWith('wrong_id')
    expect(compareSpy).toHaveBeenCalledWith('any_id')
  })

  test('should throw if TokenGenerator throws', async () => {
    const { sut, encrypterStub } = makeSut()
    vi.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.auth(fakeAuthentication)
    void expect(promise).rejects.toThrow()
  })

  test('should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateSpy = vi.spyOn(updateAccessTokenRepositoryStub, 'updateToken')
    await sut.auth(fakeAuthentication)
    expect(updateSpy).toHaveBeenCalledWith('any_token', 'any_id')
  })

  test('should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    vi.spyOn(updateAccessTokenRepositoryStub, 'updateToken').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.auth(fakeAuthentication)
    void expect(promise).rejects.toThrow()
  })
})
