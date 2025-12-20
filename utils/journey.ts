/**
 * Calculates the number of vehicles needed for a given number of passengers.
 */
export function calculateFleetSize(
	passengers: number,
	capacity: number
): number {
	if (capacity <= 0) return 0
	return Math.ceil(passengers / capacity)
}

/**
 * Formats a currency value for display with 2 decimal places.
 * Uses Math.round to ensure consistent rounding of halves up.
 */
export function formatCurrency(value: number): string {
	// Multiply by 100, round, then divide by 100 to get 2 decimal places consistently
	const rounded = Math.round((value + Number.EPSILON) * 100) / 100
	return `£${rounded.toFixed(2)}`
}
