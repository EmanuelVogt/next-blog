import { ServerError } from "@presentation/errors";
import { badRequest, serverError } from "@presentation/helpers/http";
import { i } from "vitest/dist/index-6e18a03a";
import { AddAccount, Controller, HttpRequest, HttpResponse, Validation } from "./protocols";

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.create({ email, name, password })

      return new Promise(resolve => resolve({ body: '', statusCode: 400 }))
    } catch (error) {
      if(error instanceof Error) {
        return serverError(error)
      }
      return serverError(new ServerError('An error occoured in server side, contact the server suport'))
    }
  }
}