import { UserModel } from '@domain/models/user'
import { AddAccountModel } from '@domain/use-cases/add-account'

export interface AddAccountRepository {
  create: (values: AddAccountModel) => Promise<UserModel>
}
