import { AccountModel } from "@/backend/domain/models/account";
import { AddPostController } from "@/backend/presentation/controllers/add-post";
import { AddPost, AddPostModel } from "@/backend/presentation/controllers/add-post/protocols";
import { ForbidenError, MissingParamError } from "@/backend/presentation/errors";
import { badRequest, forbidden, noContent, serverError } from "@/backend/presentation/helpers/http";
import { HttpRequest, Validation } from "@/backend/presentation/protocols";
import { describe, expect, test, vi } from "vitest";

const makeFakePost = (): AddPostModel => ({
  description: 'any_description',
  published: true,
  thumb: 'any_thumb',
  title: 'user_title',
  user_id: 'any_user_id',
  content: 'any_content',
  user: 'any_id'
})

const makeFakeAccount = (): AccountModel => ({
  email: 'any_email',
  id: 'any_id',
  name: 'any_id',
  password: 'any_password',
  accessToken: 'any_accessToken'
})


const makeAddPost = () => {
  class AddPostStub implements AddPost {
    async add(post: AddPostModel): Promise<true | null> {
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
    addPostStub,
    httpRequest,
    validationStub,
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

  test('should return 403 if AddPost returns null', async () => {
    const { sut, addPostStub, httpRequest } = makeSut()
    vi.spyOn(addPostStub, 'add').mockReturnValueOnce(
      new Promise(resolve => resolve(null!)))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new ForbidenError()))
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

  test('should return 203 if AddPost succeeds', async () => {
    const { sut, addPostStub, httpRequest } = makeSut()
    vi.spyOn(addPostStub, 'add').mockReturnValueOnce(new Promise(resolve => resolve(true)))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(noContent())
  })
})