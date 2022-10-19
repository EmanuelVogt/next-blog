import { PostModel } from "../models/post";

export interface GetPost {
  getOne(id: string): Promise<PostModel>
}