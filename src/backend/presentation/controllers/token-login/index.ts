import { MissingParamError, ServerError } from "../../errors";
import { badRequest, ok, serverError, unautorized } from "../../helpers/http";
import { HttpRequest, HttpResponse } from "../../protocols";
import { Controller, TokenAuthentication } from "./protocols";

export class TokenLogin implements Controller {
  constructor(private readonly tokenAuthentication: TokenAuthentication ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if(!accessToken){
        return badRequest(new MissingParamError('token'))
      }
      const account = await this.tokenAuthentication.auth(accessToken)
      if(!account) {
        return unautorized()
      }
      return ok(account)
    } catch (error) {
      if(error instanceof Error){
        return serverError(error)
      }
      return serverError(new ServerError('An error occoured in server side, contact the server suport'))
    }
  }

}