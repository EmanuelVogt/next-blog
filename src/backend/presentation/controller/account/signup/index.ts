import { Controller, HttpRequest, HttpResponse, Validation } from "./protocols";

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation,
  ) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    return new Promise(resolve => resolve({ body: '', statusCode: 400 }))
  }

}