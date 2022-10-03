import { InvalidParamError } from '@/backend/presentation/errors'
import { EmailValidator } from '../protocols/email-validator'
import { Validation } from '@/backend/presentation/protocols/validation'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValiodator: EmailValidator
  ) { }

  validate (input: any): Error | null {
    const isValid = this.emailValiodator.ensureIsValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
