import { EmailValidatorAdapter } from '@/backend/infra/validators/email-validator.adapter'
import { EmailValidator } from '@/backend/validation/protocols/email-validator'
import validator from 'validator'
import { test, describe, expect, vi } from 'vitest'

vi.doMock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  const makeSut = (): EmailValidator => new EmailValidatorAdapter()

  test('should return false if provided an invalid email', () => {
    const sut = makeSut()
    vi.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.ensureIsValid('invalide@mail.com')
    expect(isValid).toBe(false)
  })

  test('should return true if provided an valid email', () => {
    const sut = makeSut()
    const isValid = sut.ensureIsValid('valid@mail.com')
    expect(isValid).toBe(true)
  })

  test('should return true if provided an valid email', () => {
    const sut = makeSut()
    const anyEmail = 'any_email@mail.com'
    const isSpyEmail = vi.spyOn(validator, 'isEmail')
    sut.ensureIsValid(anyEmail)
    expect(isSpyEmail).toHaveBeenCalledWith(anyEmail)
  })
})
