import { UserModel } from '../models/user'

export interface AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  create: (account: AddAccountModel) => Promise<UserModel>
}
