import { AddPostModel } from '@domain/use-cases/add-post'

export interface AddPostRepository {
  add: (values: AddPostModel) => Promise<true | null>
}
