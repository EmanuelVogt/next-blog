
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/backend/validation/validators'
import { Validation } from '@/backend/presentation/protocols/validation'
import { EmailValidatorAdapter } from '@/backend/infra/validators/email-validator.adapter'

export const makeLoginValidationFactory = (): ValidationComposite => {
  const validations: Validation[] = []

  const requiredFields = [
    'email',
    'password'
  ]
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
