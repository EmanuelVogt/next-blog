import { makeDbAddPost } from "@main/factories/use-cases/db-add-post-factory";
import { AddPostController } from "@presentation/controllers/add-post";
import { Controller } from "@presentation/protocols";
import { makeAddPostValidations } from "./add-post-validations"

export const makeAddPostController = (): Controller => {
  return new AddPostController(makeAddPostValidations(), makeDbAddPost())
} 