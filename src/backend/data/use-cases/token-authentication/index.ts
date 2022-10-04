import { Decrypter } from "../load-account-by-token/protocols";
import { AuthenticatedAccountModel, TokenAuthentication } from "./protocols";

export class DbTokenAuthentication implements TokenAuthentication {
  constructor(private readonly decrypter: Decrypter) {}

  async auth(token: string): Promise<AuthenticatedAccountModel> {
    const tokenPayload = await this.decrypter.decrypt(token)
    if(!tokenPayload){
      
    }
    return new Promise(resolve => resolve(null!))
  }
} 