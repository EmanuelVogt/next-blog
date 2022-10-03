import { ForbidenError, ServerError } from "@/backend/presentation/errors";
import { badRequest, forbidden, noContent, serverError } from "@/backend/presentation/helpers/http";
import {
  AddPost,
  AddPostModel,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from "./protocols";

export class AddPostController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addPost: AddPost,
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const result = await this.addPost.add(httpRequest.body)
      if (result) return noContent()
      return forbidden(new ForbidenError())
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        return serverError(error)
      }
      return serverError(new ServerError('An error occoured in server side, contact the server suport'))
    }
  }
}