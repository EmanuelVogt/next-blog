import { PostModel } from '@/backend/domain/models/post'
import { GetPosts } from '@/backend/domain/use-cases/get-posts'
import { GetPostsController } from '@/backend/presentation/controllers/get-posts'
import { serverError } from '@/backend/presentation/helpers/http'
import { HttpRequest } from '@/backend/presentation/protocols'
import { describe, test, expect, vi } from 'vitest'

const makeGetPostsStub = (): GetPosts => {
  class GetPostsStub implements GetPosts {
    async getAll(): Promise<PostModel[]> {
      return new Promise(resolve => resolve(
        [
          {
            description: 'any_post',
            id: 'any_id',
            published: true,
            thumb: 'any_thumb',
            title: 'any_title',
            user_id: 'any_user_id'
          },
          {
            description: 'any_post2',
            id: 'any_id2',
            published: true,
            thumb: 'any_thumb2',
            title: 'any_title2',
            user_id: 'any_user_id2'
          }
        ]
      ))
    }
  }
  return new GetPostsStub()
}

interface SutTypes {
  sut: GetPostsController
  getPostsStub: GetPosts
  httpRequest: HttpRequest
}

const makeSut = (): SutTypes => {
  const httpRequest: HttpRequest = {}
  const getPostsStub = makeGetPostsStub()
  const sut = new GetPostsController(getPostsStub)
  return {
    sut,
    getPostsStub,
    httpRequest
  }
}

describe('GetPosts Controller', () => {
  test('should call GetPosts', async () => {
    const { getPostsStub, sut, httpRequest } = makeSut()
    const spy = vi.spyOn(getPostsStub, 'getAll')
    await sut.handle(httpRequest)
    expect(spy).toHaveBeenCalled()
  })

  test('should return 500 if GetPosts throws', async () => {
    const { sut, getPostsStub, httpRequest } = makeSut()
    vi.spyOn(getPostsStub, 'getAll').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})