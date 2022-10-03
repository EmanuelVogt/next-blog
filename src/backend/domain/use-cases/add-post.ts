import { PostModel } from "@domain/models/post";

export interface AddPost {
  add(post: PostModel): Promise<boolean>
}