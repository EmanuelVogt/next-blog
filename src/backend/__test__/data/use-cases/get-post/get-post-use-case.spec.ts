import { GetPostRepository } from '@/backend/data/protocols/db/get-post-repository'
import { DbGetPost } from '@/backend/data/use-cases/get-post'
import { PostModel } from '@/backend/domain/models/post'
import { describe, test, expect, vi } from 'vitest'

const makeGetPosts = (): GetPostRepository => {
  class GetPostRepositoryStyb implements GetPostRepository {
    async findById(id: string): Promise<PostModel> {
      return new Promise(resolve => resolve({
        description: 'any_description',
        id: 'any_id',
        published: true,
        thumb: 'any_thumb',
        title: 'any_title'
      }))
    }
  }
  return new GetPostRepositoryStyb()
}

interface SutTypes {
  sut: DbGetPost
  getPostRepositoryStub: GetPostRepository
}

const makeSut = (): SutTypes => {
  const getPostRepositoryStub = makeGetPosts()
  const sut = new DbGetPost(getPostRepositoryStub)
  return {
    getPostRepositoryStub,
    sut
  }
}
describe('DbGetPost use-case', () => {
  test('should call GetPostRepository with correct value', async () => {
    const { getPostRepositoryStub, sut } = makeSut() 
    const spy = vi.spyOn(getPostRepositoryStub, 'findById')
    await sut.getOne('any_id')
    expect(spy).toHaveBeenCalledWith('any_id')
  })

  test('should return null if GetPostRepository retuns empty', async () => {
    const { sut, getPostRepositoryStub } = makeSut()
    vi.spyOn( getPostRepositoryStub, 'findById')
      .mockReturnValueOnce(new Promise(resolve => resolve(null!)))
    const sutResponse = await sut.getOne('any_id')
    expect(sutResponse).toBe(null)
  })

  test('should throw if GetPostRepository throws', () => {
    const { getPostRepositoryStub, sut } = makeSut()
    vi
      .spyOn(getPostRepositoryStub, 'findById')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.getOne('any_id')
    void expect(promise).rejects.toThrow()
  })
})