import { Validation } from '@/backend/presentation/protocols/validation'
import { EmailValidator } from '@/backend/validation/protocols/email-validator'
import { makeSignUpControllerFactory } from '@/backend/main/factories/controllers/signup-controller-factory'
import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/backend/validation/validators'
import { describe, test, expect, vi } from 'vitest'

vi.mock('../../../validation/validators/validation-composite.ts')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    ensureIsValid (): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignupValidation Factory', () => {
  test('should call ValidationComposite with all validation fields', () => {
    makeSignUpControllerFactory()
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
    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
