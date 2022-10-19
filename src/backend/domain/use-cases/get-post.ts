import { PostModel } from "../models/post";

export interface GetPost {
  getOne(): Promise<PostModel>
}