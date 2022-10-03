import { PostModel } from "@domain/models/post";
import { AddPostController } from "@presentation/controllers/add-post";
import { AddPost } from "@presentation/controllers/add-post/protocols";
import { MissingParamError } from "@presentation/errors";
import { badRequest, serverError } from "@presentation/helpers/http";
import { HttpRequest, Validation } from "@presentation/protocols";
import { describe, expect, test, vi } from "vitest";

const makeFakePost = (): PostModel => ({
  description: 'any_description',
  id: 'any_id',
  published: true,
  thumb: 'any_thumb',
  title: 'user_title',
  user_id: 'any_user_id'
})

const makeAddPost = () => {
  class AddPostStub implements AddPost {
    async add(post: PostModel): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
  return new AddPostStub()
}

const makeValidation = () => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null!
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: AddPostController
  validationStub: Validation
  addPostStub: AddPost
  httpRequest: HttpRequest
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addPostStub = makeAddPost()
  const httpRequest = { body: makeFakePost() }
  const sut = new AddPostController(validationStub, addPostStub)
  return {
    sut,
    validationStub,
    addPostStub,
    httpRequest
  }
}

describe('AddPostController', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub, httpRequest } = makeSut()
    const spy = vi.spyOn(validationStub, 'validate')
    await sut.handle(httpRequest)
    expect(spy).toHaveBeenCalledWith(makeFakePost())
  })

  test('should return 400 if valididation return an error', async () => {
    const { sut, validationStub, httpRequest } = makeSut()
    vi.spyOn(validationStub, 'validate').mockReturnValue(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('should call AddPost with correct values', async () => {
    const { sut, addPostStub, httpRequest } = makeSut()
    const spy = vi.spyOn(addPostStub, 'add')
    await sut.handle(httpRequest)
    expect(spy).toHaveBeenCalledWith(makeFakePost())
  })

  test('should return 500 if AddPost throws', async () => {
    const { sut, addPostStub, httpRequest } = makeSut()
    //@ts-ignore
    vi.spyOn(addPostStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})