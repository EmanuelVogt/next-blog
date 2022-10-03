import { ForbidenError, ServerError } from "@presentation/errors";
import { badRequest, forbidden, noContent, serverError } from "@presentation/helpers/http";
import {
  AddPost,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from "./protocols";

export class AddPostController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addPost: AddPost
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const data = httpRequest.body
      const result = await this.addPost.add(data)
      if (result) return noContent()
      return forbidden(new ForbidenError())
    } catch (error) {
      if (error instanceof Error) {
        return serverError(error)
      }
      return serverError(new ServerError('An error occoured in server side, contact the server suport'))
    }
  }
}