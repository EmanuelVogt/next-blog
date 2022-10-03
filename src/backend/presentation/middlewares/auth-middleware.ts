import { AccessDenied, ServerError } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http'
import { HttpRequest, HttpResponse, LoadAccountByToken, Middleware } from './protocols'

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken)
        if (account) {
          return ok({ accountId: account.id })
        }
      }
      return forbidden(new AccessDenied())
    } catch (error) {
      if (error instanceof Error) {
        return forbidden(error)
      }
      return serverError(new ServerError('An error occoured in server side, contact the server suport'))
    }
  }
}
