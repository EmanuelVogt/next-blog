import {
  Authentication,
  AuthenticationModel,
  HashComparer,
  LoadAccountByEmailRepository,
  Encrypter,
  UpdateAccessTokenRepository,
  AuthenticatedAccountModel
} from './protocols'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) { }

  async auth({ email, password }: AuthenticationModel): Promise<AuthenticatedAccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (account) {
      const isValid = await this.hashComparer.compare(password, account.password)
      if (isValid) {
        const newToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateToken(newToken, account.id)
        const {password, accessToken, ...rest} = account
        return {
          accessToken: newToken,
          ...rest
        }
      }
    }
    return null!
  }
}
