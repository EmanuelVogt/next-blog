import { Controller, GetPost, HttpRequest, HttpResponse, noContent, ok, serverError } from "./protocols";

export class GetPostController implements Controller {
  constructor(private readonly getPost: GetPost) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.query
      const post = await this.getPost.getOne(id)
      if (!!post) {
        return ok(post)
      }
      return noContent()
    } catch (error) {
      console.log(error)
      return serverError(error as Error)
    }
  }
}