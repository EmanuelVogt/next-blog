import {
  AuthenticatedAccountModel,
  Decrypter,
  Encrypter,
  LoadAccountByIdRepository,
  TokenAuthentication,
  UpdateAccessTokenRepository
} from "./protocols";

export class DbTokenAuthentication implements TokenAuthentication {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountById: LoadAccountByIdRepository,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) { }

  async auth(token: string): Promise<AuthenticatedAccountModel> {
    const tokenDecrypted = await this.decrypter.decrypt(token)
    if (tokenDecrypted) {
      const account = await this.loadAccountById.loadById(tokenDecrypted.id)
      if (account) {
        const newToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateToken(newToken, account.id)
        const { password, accessToken, ...rest } = account
        return {
          accessToken: newToken,
          ...rest
        }
      }
    }
    return null!
  }
} 