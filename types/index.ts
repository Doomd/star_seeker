export interface GateLink {
	code: string
	hu: string
}

export interface Gate {
	uuid: string
	code: string
	name: string
	createdAt: string
	updatedAt: string | null
	links: GateLink[]
}

export interface GateConnection {
	code: string
	name: string
	distance: number
}

export type GateDetails = Gate

export interface TransportOption {
	name: string
	description?: string
	speed?: number
	ratePerAu?: number
	costPerAu?: number // Kept for backward compat if needed, but API uses ratePerAu
	capacity?: number
	maxDistance?: number
}

export interface Journey {
	from: Gate
	to: Gate
	route: string[]
	totalCost: number
}

export interface TransportCost {
	currency: string
	journeyCost: number
	parkingFee: number
	totalCost?: number // Computed in UI or missing in API
	recommendedTransport: TransportOption
}
