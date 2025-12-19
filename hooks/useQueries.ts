import { client } from '@/api/client'
import { Gate, GateDetails, Journey, TransportCost } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useGates = () => {
	return useQuery({
		queryKey: ['gates'],
		queryFn: async () => {
			const response = await client.get<Gate[]>('/gates')
			return response.data
		},
	})
}

export const useGateDetails = (gateCode: string) => {
	return useQuery({
		queryKey: ['gate', gateCode],
		queryFn: async () => {
			const response = await client.get<GateDetails>(`/gates/${gateCode}`)
			return response.data
		},
		enabled: !!gateCode,
	})
}

export const useTransportCost = (distance: number, passengers: number, parking: number) => {
	return useQuery({
		queryKey: ['transport', distance, passengers, parking],
		queryFn: async () => {
			const response = await client.get<TransportCost>(
				`/transport/${distance}?passengers=${passengers}&parking=${parking}`
			)
			return response.data
		},
		enabled: distance > 0 && passengers > 0,
	})
}

export const useCheapestRoute = (from: string, to: string) => {
	return useQuery({
		queryKey: ['route', from, to],
		queryFn: async () => {
			const response = await client.get<Journey>(`/gates/${from}/to/${to}`)
			return response.data
		},
		enabled: !!from && !!to && from !== to,
	})
}
