import { DbGetPosts } from "@/backend/data/use-cases/get-posts";
import { GetPosts } from "@/backend/domain/use-cases/get-posts";
import { PostPrismaRepository } from "@/backend/infra/db/prisma/repositories/post";

export const makeDbGetPosts = (): GetPosts => {
  const prismaGetPostsRepository = new PostPrismaRepository()
  return new DbGetPosts(prismaGetPostsRepository)
}