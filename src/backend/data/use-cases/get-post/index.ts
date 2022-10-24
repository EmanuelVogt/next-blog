import { GetPost, GetPostRepository, PostModel } from "./protocols";

export class DbGetPost implements GetPost {
  constructor(
    private readonly getPostRepository: GetPostRepository
    ) { }

  async getOne(id: string): Promise<PostModel> {
    const post = await this.getPostRepository.findById(id)
    return post || null
  }
} 