export interface AccountModel {
  id: string
  name: string
  email: string
  password: string
  accessToken?: string
}

export interface AuthenticatedAccountModel {
  id: string
  name: string
  email: string
  accessToken: string
}
