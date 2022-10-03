import { makeDbAddPost } from "@/backend/main/factories/use-cases/db-add-post-factory";
import { AddPostController } from "@/backend/presentation/controllers/add-post";
import { Controller } from "@/backend/presentation/protocols";
import { makeAddPostValidations } from "./add-post-validations"

export const makeAddPostController = (): Controller => {
  return new AddPostController(makeAddPostValidations(), makeDbAddPost())
} 