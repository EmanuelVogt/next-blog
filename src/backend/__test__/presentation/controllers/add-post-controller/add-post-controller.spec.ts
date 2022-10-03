import { PostModel } from "@domain/models/post";
import { AddPostController } from "@presentation/controllers/add-post";
import { AddPost } from "@presentation/controllers/add-post/protocols";
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
    const authSpy = vi.spyOn(validationStub, 'validate')
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith(makeFakePost())
  })
})