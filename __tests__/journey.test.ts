import { calculateFleetSize, formatCurrency } from '../utils/journey'

describe('journey utils', () => {
	describe('calculateFleetSize', () => {
		it('should return 1 when passengers is less than or equal to capacity', () => {
			expect(calculateFleetSize(1, 4)).toBe(1)
			expect(calculateFleetSize(4, 4)).toBe(1)
		})

		it('should return 2 when passengers is slightly more than capacity', () => {
			expect(calculateFleetSize(5, 4)).toBe(2)
		})

		it('should return the correct number for a large fleet', () => {
			expect(calculateFleetSize(10, 2)).toBe(5)
		})

		it('should return 0 when capacity is 0 (safety check)', () => {
			expect(calculateFleetSize(10, 0)).toBe(0)
		})
	})

	describe('formatCurrency', () => {
		it('should format numbers correctly with 2 decimal places', () => {
			expect(formatCurrency(10)).toBe('£10.00')
			expect(formatCurrency(10.5)).toBe('£10.50')
			expect(formatCurrency(10.555)).toBe('£10.56')
		})
	})
})
