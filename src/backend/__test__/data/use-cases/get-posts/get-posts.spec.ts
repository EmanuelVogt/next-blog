import { GetPostsRepository } from '@/backend/data/protocols/db/get-posts-repository'
import { DbGetPosts } from '@/backend/data/use-cases/get-posts'
import { PostModel } from '@/backend/domain/models/post'
import { describe, test, expect, vi } from 'vitest'

const makeGetPosts = (): GetPostsRepository => {
  class GetPostsRepositoryStyb implements GetPostsRepository {
    async find(): Promise<PostModel[]> {
      return new Promise(resolve => resolve([{
        description: 'any_description',
        id: 'any_id',
        published: true,
        thumb: 'any_thumb',
        title: 'any_title'
      }]))
    }
  }
  return new GetPostsRepositoryStyb()
}

interface SutTypes {
  sut: DbGetPosts
  getPostsRepositoryStub: GetPostsRepository
}

const makeSut = (): SutTypes => {
  const getPostsRepositoryStub = makeGetPosts()
  const sut = new DbGetPosts(getPostsRepositoryStub)
  return {
    getPostsRepositoryStub,
    sut
  }
}
describe('DbGetPosts use-case', () => {
  test('should calls GetPostsRepository with correct values', async () => {
    const { getPostsRepositoryStub, sut } = makeSut() 
    const spy = vi.spyOn(getPostsRepositoryStub, 'find')
    await sut.getAll()
    expect(spy).toHaveBeenCalled()
  })

  test('should return empy array if GetPostsRepository retuns empy array', async () => {
    const { sut, getPostsRepositoryStub } = makeSut()
    vi.spyOn( getPostsRepositoryStub, 'find')
      .mockReturnValueOnce(new Promise(resolve => resolve([])))
    const sutResponse = await sut.getAll()
    expect(sutResponse).toEqual([])
  })

  test('should throw if GetPostsRepository throws', () => {
    const { getPostsRepositoryStub, sut } = makeSut()
    vi
      .spyOn(getPostsRepositoryStub, 'find')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.getAll()
    void expect(promise).rejects.toThrow()
  })
})