import { Controller, GetPosts, HttpRequest, HttpResponse, noContent, ok, serverError } from "./protocols";

export class GetPostsController implements Controller {
  constructor(private readonly getPosts: GetPosts) {}
  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const posts = await this.getPosts.getAll()
      if(!!posts.length){
        return ok(posts)
      }
      return noContent()
    } catch (error) {
      return serverError(error as Error)
    }
  }
}