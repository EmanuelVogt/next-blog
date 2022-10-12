import { AddPostRepository } from "@/backend/data/protocols/db/add-post-repository";
import { GetPostsRepository } from "@/backend/data/protocols/db/get-posts-repository";
import { PostModel } from "@/backend/domain/models/post";
import { AddPostModel } from "@/backend/domain/use-cases/add-post";
import { PrismaClient } from "@prisma/client";

export class PostPrismaRepository implements AddPostRepository, GetPostsRepository {
  private client: PrismaClient
  constructor() {
    this.client = new PrismaClient()
  }
  
  async find (): Promise<PostModel[]> {
    return await this.client.posts.findMany()
  }

  async add(values: AddPostModel): Promise<true | null> {
    const { user, ...rest } = values
    const post = await this.client.posts.create({
      data: {
        ...rest,
        user: {
          connect: {
            id: user
          }
        }
      }
    })
    return !!post
  }
} 