export interface CreatePostModel {
  title: string
  description: string
  user_id: string
  created_at: Date
}

export interface CreatePost {
  create: (surveyData: CreatePostModel) => Promise<void>
}
