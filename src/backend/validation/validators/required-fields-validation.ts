import { MissingParamError } from '@/backend/presentation/errors'
import { Validation } from '@/backend/presentation/protocols/validation'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error | null {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
    return null
  }
}
