import { PostModel } from '@/backend/domain/models/post'
import { GetPost } from '@/backend/domain/use-cases/get-post'
import { GetPostController } from '@/backend/presentation/controllers/get-post'
import { serverError } from '@/backend/presentation/helpers/http'
import { HttpRequest } from '@/backend/presentation/protocols'
import { describe, test, expect, vi } from 'vitest'

const makeGetPostsStub = (): GetPost => {
  class GetPostStub implements GetPost {
    async getOne(id: string): Promise<PostModel> {
      return new Promise(resolve => resolve(
        {
          description: 'any_post',
          id: 'any_id',
          published: true,
          thumb: 'any_thumb',
          title: 'any_title',
        }
      ))
    }
  }
  return new GetPostStub()
}

interface SutTypes {
  sut: GetPostController
  getPostStub: GetPost
  httpRequest: HttpRequest
}

const makeSut = (): SutTypes => {
  const httpRequest: HttpRequest = { query: { id: 'any_id' } }
  const getPostStub = makeGetPostsStub()
  const sut = new GetPostController(getPostStub)
  return {
    sut,
    getPostStub,
    httpRequest
  }
}

describe('GetPost Controller', () => {
  test('should call GetPost', async () => {
    const { getPostStub, sut, httpRequest } = makeSut()
    const spy = vi.spyOn(getPostStub, 'getOne')
    await sut.handle(httpRequest)
    expect(spy).toHaveBeenCalledWith('any_id')
  })

  test('should return 500 if GetPosts throws', async () => {
    const { sut, getPostStub, httpRequest } = makeSut()
    vi.spyOn(getPostStub, 'getOne').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error())) as Error
    })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})