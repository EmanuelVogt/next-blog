import { Controller, GetPost, HttpRequest, HttpResponse, noContent, ok, serverError } from "./protocols";

export class GetPostController implements Controller {
  constructor(private readonly getPost: GetPost) {}
  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const post = await this.getPost.getOne()
      if(!!post){
        return ok(post)
      }
      return noContent()
    } catch (error) {
      return serverError(error as Error)
    }
  }
}