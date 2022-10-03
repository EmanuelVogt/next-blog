import { AddPost, AddPostModel, AddPostRepository } from "./protocols";

export class DbAddPost implements AddPost {
  constructor(
    private readonly addPostRepository: AddPostRepository
    ) { }

  async add(post: AddPostModel): Promise<true | null> {
    return await this.addPostRepository.add(post)
  }
} 