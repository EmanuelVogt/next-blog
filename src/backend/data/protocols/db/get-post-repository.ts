import { PostModel } from '../../use-cases/get-posts/protocols'

export interface GetPostRepository {
  findById: (id: string) => Promise<PostModel>
}
