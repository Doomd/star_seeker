import { useQueryClient } from '@tanstack/react-query'
import { useSyncExternalStore, useCallback } from 'react'

interface CacheStats {
	gates: number
	gateDetails: number
	routes: number
}

/**
 * Returns live statistics about what's currently cached in TanStack Query.
 * Subscribes to cache updates so the UI refreshes when data is prefetched.
 */
export function useCacheStats(): CacheStats {
	const queryClient = useQueryClient()

	const subscribe = useCallback(
		(callback: () => void) => {
			const unsubscribe = queryClient.getQueryCache().subscribe(callback)
			return unsubscribe
		},
		[queryClient]
	)

	const getSnapshot = useCallback(() => {
		const cache = queryClient.getQueryCache()
		const queries = cache.getAll()

		let gates = 0
		let gateDetails = 0
		let routes = 0

		for (const query of queries) {
			// Only count queries that have data (not pending/error)
			if (query.state.data === undefined) continue

			const key = query.queryKey

			if (key[0] === 'gates' && key.length === 1) {
				// The main gates list - count how many gates are in it
				const data = query.state.data
				gates = Array.isArray(data) ? data.length : 0
			} else if (key[0] === 'gate' && key.length === 2) {
				// Individual gate detail
				gateDetails++
			} else if (key[0] === 'route' && key.length === 3) {
				// Route combination
				routes++
			}
		}

		return JSON.stringify({ gates, gateDetails, routes })
	}, [queryClient])

	const statsString = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

	return JSON.parse(statsString) as CacheStats
}
