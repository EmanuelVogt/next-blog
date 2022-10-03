import { UserModel } from '@/backend/domain/models/user'
import { AddAccountModel } from '@/backend/domain/use-cases/add-account'

export interface AddAccountRepository {
  create: (values: AddAccountModel) => Promise<UserModel>
}
