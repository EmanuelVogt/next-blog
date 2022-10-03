import { AddPostRepository } from "@data/protocols/db/add-post-repository";
import { AddPostModel } from "@domain/use-cases/add-post";
import { PrismaClient } from "@prisma/client";

export class PostPrismaRepository implements AddPostRepository {
  private client: PrismaClient
  constructor() {
    this.client = new PrismaClient()
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