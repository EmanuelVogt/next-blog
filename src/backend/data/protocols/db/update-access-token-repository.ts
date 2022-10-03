
export interface UpdateAccessTokenRepository {
  updateToken: (token: string, id: string) => Promise<void>
}
