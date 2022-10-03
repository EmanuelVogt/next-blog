import { AccountModel } from "@domain/models/account";
import { AddPostController } from "@presentation/controllers/add-post";
import { AddPost, AddPostModel, LoadAccountByToken } from "@presentation/controllers/add-post/protocols";
import { ForbidenError, MissingParamError } from "@presentation/errors";
import { badRequest, forbidden, noContent, serverError } from "@presentation/helpers/http";
import { HttpRequest, Validation } from "@presentation/protocols";
import { describe, expect, test, vi } from "vitest";

const makeFakePost = (): AddPostModel => ({
  description: 'any_description',
  published: true,
  thumb: 'any_thumb',
  title: 'user_title',
  user_id: 'any_user_id',
  content: 'any_content',
  user: {
    email: 'any_email',
    id: 'any_id',
    name: 'any_id',
    password: 'any_password',
    accessToken: 'any_accessToken'
  }
})

const makeFakeAccount = (): AccountModel => ({
  email: 'any_email',
  id: 'any_id',
  name: 'any_id',
  password: 'any_password',
  accessToken: 'any_accessToken'
})


const makeLoadAccountById = (): LoadAccountByToken => {
  class LoadAccountByIdStub implements LoadAccountByToken {
    async load(id: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(
        {
          email: 'any_email',
          id: 'any_id',
          name: 'any_id',
          password: 'any_password',
          accessToken: 'any_accessToken'
        }
      ))
    }
  }

  return new LoadAccountByIdStub()
}

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
  loadAccountByIdStub: LoadAccountByToken
  addPostStub: AddPost
  httpRequest: HttpRequest
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addPostStub = makeAddPost()
  const httpRequest = { body: makeFakePost() }
  const loadAccountByIdStub = makeLoadAccountById()
  const sut = new AddPostController(validationStub, addPostStub, loadAccountByIdStub)
  return {
    sut,
    addPostStub,
    httpRequest,
    validationStub,
    loadAccountByIdStub,
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

  test('should call LoadAccountById with correct value', async () => {
    const { sut, loadAccountByIdStub, httpRequest } = makeSut()
    const loadSpy = vi.spyOn(loadAccountByIdStub, 'load')
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith('any_user_id')
  })

  test('should return 400 if LoadAccountById returns null', async () => {
    const { sut, loadAccountByIdStub, httpRequest } = makeSut()
    vi.spyOn(loadAccountByIdStub, 'load')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('user_id')))
  })

  test('should return 500 if LoadAccountById throws', async () => {
    const { sut, loadAccountByIdStub, httpRequest } = makeSut()
    //@ts-ignore
    vi.spyOn(loadAccountByIdStub, 'load').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})