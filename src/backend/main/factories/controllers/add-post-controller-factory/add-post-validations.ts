import {
  RequiredFieldValidation,
  ValidationComposite
} from '@validation/validators'
import { Validation } from '@presentation/protocols/validation'

export const makeAddPostValidations = (): ValidationComposite => {
  const validations: Validation[] = []

  const requiredFields = [
    'title',
    'description',
    'published',
    'content',
    'thumb',
    'user'
  ]

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
