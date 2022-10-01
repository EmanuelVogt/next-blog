import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'
import { describe, test, expect, vi } from 'vitest'

type SutTypes = {
  sut: BcryptAdapter
}

const makeSut = (): SutTypes => {
  const salt = 12
  const sut = new BcryptAdapter(salt)
  return {
    sut
  }
}

describe('Bcrypt adapter', () => {
  describe('Hash', () => {
    test('should call hash with correct value', async () => {
      const { sut } = makeSut()
      vi.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
        return await new Promise((resolve) => resolve('any_hash'))
      })
      const hashSpy = vi.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
    })

    test('should return a valid hash on hash success', async () => {
      const { sut } = makeSut()
      //@ts-ignore
      vi.spyOn(sut, 'hash').mockImplementationOnce(async () => {
        return await new Promise((resolve) => resolve('any_hash'))
      })
      const hash = await sut.hash('any_hash')
      expect(hash).toEqual('any_hash')
    })

    test('should throw if hash throws', async () => {
      const { sut } = makeSut()
      vi.spyOn(bcrypt, 'hash').mockReturnValueOnce(
        //@ts-ignore
        new Promise((_resolve, reject) => reject(new Error()))
      )
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })
  describe('Compare', () => {
    test('should call compare with correct values', async () => {
      const { sut } = makeSut()
      const hashSpy = vi.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')
      expect(hashSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    test('should return true when comparer succeeds', async () => {
      const { sut } = makeSut()
      vi.spyOn(sut, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(true)))
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(true)
    })

    test('should call compare with correct values', async () => {
      const { sut } = makeSut()
      vi.spyOn(bcrypt, 'compare')
      //@ts-ignore
      .mockReturnValueOnce(new Promise(resolve => resolve(false)))
      const isValid = await sut.compare('any_value', 'wrong_hash')
      expect(isValid).toBe(false)
    })
  })
})
