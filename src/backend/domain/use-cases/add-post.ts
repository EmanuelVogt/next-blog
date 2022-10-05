export interface AddPostModel {
  title: string
  description: string
  content: string
  user: string
  published: boolean
  thumb: string
}

export interface AddPost {
  add(post: AddPostModel): Promise<true | null>
}