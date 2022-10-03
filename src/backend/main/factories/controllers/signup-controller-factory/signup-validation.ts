
import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/backend/validation/validators'
import { Validation } from '@/backend/presentation/protocols/validation'
import { EmailValidatorAdapter } from '@/backend/infra/validators/email-validator.adapter'

export const makeSignupValidationFactory = (): ValidationComposite => {
  const validations: Validation[] = []

  const requiredFields = [
    'email',
    'name',
    'password',
    'passwordConfirmation'
  ]
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
