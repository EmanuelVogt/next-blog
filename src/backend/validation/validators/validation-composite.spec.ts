import { MissingParamError } from '@/backend/presentation/errors'
import { ValidationComposite } from './validation-composite'
import { Validation } from '@/backend/presentation/protocols/validation'
import { describe, test, expect, vi } from 'vitest'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null!
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  test('should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    vi.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('should return the first error if more than one   validation fails', () => {
    const { sut, validationStubs } = makeSut()
    vi.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    vi.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
    expect(error).not.toEqual(new MissingParamError('field'))
  })

  test('should return if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    void expect(error).toBeFalsy
  })
})
