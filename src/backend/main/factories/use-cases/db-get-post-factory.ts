import { DbGetPost } from "@/backend/data/use-cases/get-post";
import { GetPost } from "@/backend/domain/use-cases/get-post";
import { PostPrismaRepository } from "@/backend/infra/db/prisma/repositories/post";

export const makeDbGetPost = (): GetPost => {
  const prismaGetPostsRepository = new PostPrismaRepository()
  return new DbGetPost(prismaGetPostsRepository)
}