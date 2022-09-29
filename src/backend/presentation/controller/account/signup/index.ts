import { Controller, HttpRequest, HttpResponse } from "./protocols";

export class SignUpController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise(resolve => resolve({ body: '', statusCode: 400 }))
  }

}