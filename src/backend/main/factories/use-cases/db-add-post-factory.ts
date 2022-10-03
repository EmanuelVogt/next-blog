import { DbAddPost } from "@/backend/data/use-cases/add-post";
import { PostPrismaRepository } from "@/backend/infra/db/prisma/repositories/post"

export const makeDbAddPost = (): DbAddPost => {
  const addPostPrismaRepository = new PostPrismaRepository()
  return new DbAddPost(addPostPrismaRepository)
}