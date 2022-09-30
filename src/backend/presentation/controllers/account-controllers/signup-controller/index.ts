import { ForbidenError, ServerError } from "@presentation/errors";
import { badRequest, forbidden, serverError } from "@presentation/helpers/http";
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
      if (!account) {
        return forbidden(new ForbidenError())
      }
      return new Promise(resolve => resolve({ body: '', statusCode: 400 }))
    } catch (error) {
      if(error instanceof Error) {
        return serverError(error)
      }
      return serverError(new ServerError('An error occoured in server side, contact the server suport'))
    }
  }
}