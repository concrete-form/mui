import { isValidDate } from './date'

describe('util > date', () => {
  describe('isValidDate', () => {
    it('detect valid date', () => {
      expect(isValidDate(new Date())).toBe(true)
    })
    it('detect invalid date', () => {
      expect(isValidDate(new Date('invalid'))).toBe(false)
    })
    it('consider empty value as invalid date', () => {
      expect(isValidDate(undefined)).toBe(false)
    })
  })
})
