import { GetPostsController } from "@/backend/presentation/controllers/get-posts";
import { Controller } from "@/backend/presentation/protocols";
import { makeDbGetPosts } from '../../use-cases/db-get-posts-factory'

export const makeGetPostsController = (): Controller => {
  return new GetPostsController(makeDbGetPosts())
}