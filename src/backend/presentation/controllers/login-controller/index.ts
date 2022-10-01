import { ServerError } from '@presentation/errors'
import { unautorized, ok, serverError, badRequest } from '@presentation/helpers/http'
import { Authentication, Controller, HttpRequest, HttpResponse, Validation } from './protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const account = await this.authentication.auth({ email, password })
      if (!account) {
        return unautorized()
      }
      return ok({ account })
    } catch (error) {
      if (error instanceof Error) {
        return serverError(error)
      }
      return serverError(new ServerError('An error occoured in server side, contact the server suport'))
    }
  }
}
