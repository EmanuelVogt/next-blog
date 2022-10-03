import { AddPostModel } from '@/backend/domain/use-cases/add-post'

export interface AddPostRepository {
  add: (values: AddPostModel) => Promise<true | null>
}
