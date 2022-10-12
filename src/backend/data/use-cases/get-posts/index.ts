import { PostModel } from "@/backend/domain/models/post";
import { GetPosts } from "@/backend/domain/use-cases/get-posts";
import { GetPostsRepository } from "../../protocols/db/get-posts-repository";

export class DbGetPosts implements GetPosts {
  constructor(
    private readonly getPostsRepository: GetPostsRepository
    ) { }

  async getAll(): Promise<PostModel[]> {
    return await this.getPostsRepository.find()
  }
} 