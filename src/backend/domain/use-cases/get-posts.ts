import { PostModel } from "../models/post";

export interface GetPosts {
  getAll(): Promise<PostModel[]>
}