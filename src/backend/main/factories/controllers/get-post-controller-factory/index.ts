import { GetPostController } from "@/backend/presentation/controllers/get-post";
import { Controller } from "@/backend/presentation/protocols";
import { makeDbGetPost } from "../../use-cases/db-get-post-factory";

export const makeGetPostController = (): Controller => {
  return new GetPostController(makeDbGetPost())
}