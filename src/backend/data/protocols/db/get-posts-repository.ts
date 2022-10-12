import { PostModel } from '../../use-cases/get-posts/protocols'

export interface GetPostsRepository {
  find: () => Promise<PostModel[]>
}
