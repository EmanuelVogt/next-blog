import { AddPostRepository } from '@/backend/data/protocols/db/add-post-repository'
import { DbAddPost } from '@/backend/data/use-cases/add-post'
import { AddPostModel } from '@/backend/domain/use-cases/add-post'
import { describe, test, expect, vi } from 'vitest'

const makeFakePost = (): AddPostModel => ({
  description: 'any_description',
  published: true,
  thumb: 'any_thumb',
  title: 'any_title',
  user: 'any_user_id',
  content: 'any_content',

})

const makeAddPost = (): AddPostRepository => {
  class AddPostRepositoryStub implements AddPostRepository {
    async add(data: AddPostModel): Promise<true | null> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new AddPostRepositoryStub()
}

interface SutTypes {
  sut: DbAddPost
  addPostRepositoryStub: AddPostRepository
}

const makeSut = (): SutTypes => {
  const addPostRepositoryStub = makeAddPost()
  const sut = new DbAddPost(addPostRepositoryStub)
  return {
    addPostRepositoryStub,
    sut
  }
}
describe('DbAddPost use-case', () => {
  test('should DbAddPost calls AddPostRepository with correct values', async () => {
    const { addPostRepositoryStub, sut } = makeSut() 
    const spy = vi.spyOn(addPostRepositoryStub, 'add')
    await sut.add(makeFakePost())
    expect(spy).toHaveBeenCalledWith(makeFakePost())
  })

  test('should return null if AddPostRepository not returns null', async () => {
    const { sut, addPostRepositoryStub } = makeSut()
    vi.spyOn(addPostRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const sutResponse = await sut.add(makeFakePost())
    expect(sutResponse).toBe(null)
  })

  test('should throw if AddAcountRepository throws', () => {
    const { addPostRepositoryStub, sut } = makeSut()
    vi
      .spyOn(addPostRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.add(makeFakePost())
    void expect(promise).rejects.toThrow()
  })

  test('should return true if AddPostRepository not returns true', async () => {
    const { sut } = makeSut()
    const sutResponse = await sut.add(makeFakePost())
    expect(sutResponse).toBe(true)
  })
})