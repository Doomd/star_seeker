import { client } from '@/api/client'
import { Gate, GateDetails, Journey } from '@/types'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useCallback } from 'react'

// Expected counts for a complete cache
const EXPECTED_GATES = 13
const EXPECTED_ROUTES = 13 * 12 // 156 combinations

/**
 * Delay helper for throttling API requests
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Check if the cache already has complete data
 */
function isCacheComplete(queryClient: QueryClient): boolean {
	const cache = queryClient.getQueryCache()
	const queries = cache.getAll()

	let gatesCount = 0
	let routesCount = 0

	for (const query of queries) {
		// Only count queries that have fresh data (not stale)
		if (query.state.data === undefined) continue
		if (query.isStale()) continue

		const key = query.queryKey

		if (key[0] === 'gates' && key.length === 1) {
			const data = query.state.data as unknown[]
			gatesCount = Array.isArray(data) ? data.length : 0
		} else if (key[0] === 'route' && key.length === 3) {
			routesCount++
		}
	}

	return gatesCount >= EXPECTED_GATES && routesCount >= EXPECTED_ROUTES
}

/**
 * Core prefetch logic - can be called on mount or manually
 */
async function prefetchAllData(
	queryClient: QueryClient,
	options: { skipCacheCheck?: boolean } = {}
): Promise<void> {
	try {
		// Check if cache is already complete before making any requests
		if (!options.skipCacheCheck && isCacheComplete(queryClient)) {
			console.log('[Prefetch] Cache already complete, skipping prefetch')
			return
		}

		// 1. Prefetch all gates (this is the foundation)
		const gates = await queryClient.fetchQuery({
			queryKey: ['gates'],
			queryFn: async () => {
				const response = await client.get<Gate[]>('/gates')
				return response.data
			},
		})

		if (!gates || gates.length === 0) {
			console.warn('[Prefetch] No gates found, skipping further prefetch')
			return
		}

		console.log(
			`[Prefetch] Loaded ${gates.length} gates, starting background cache...`
		)

		// 2. Prefetch all gate details (small delay between each)
		for (const gate of gates) {
			await queryClient.prefetchQuery({
				queryKey: ['gate', gate.code],
				queryFn: async () => {
					const response = await client.get<GateDetails>(`/gates/${gate.code}`)
					return response.data
				},
			})
			await delay(50) // Small throttle
		}

		console.log(`[Prefetch] Cached ${gates.length} gate details`)

		// 3. Prefetch all route combinations (A → B for all pairs)
		const gateCodes = gates.map((g) => g.code)
		let routeCount = 0

		for (const from of gateCodes) {
			for (const to of gateCodes) {
				if (from === to) continue // Skip same-gate routes

				await queryClient.prefetchQuery({
					queryKey: ['route', from, to],
					queryFn: async () => {
						const response = await client.get<Journey>(
							`/gates/${from}/to/${to}`
						)
						return response.data
					},
				})
				routeCount++
				await delay(30) // Throttle to ~33 requests/sec
			}
		}

		console.log(
			`[Prefetch] Cached ${routeCount} route combinations. Background caching complete!`
		)
	} catch (error) {
		// Silently fail - this is a background optimization, not critical
		console.warn('[Prefetch] Background caching failed:', error)
	}
}

/**
 * Background pre-fetcher that caches all API data for offline use.
 * Runs once on mount and populates the TanStack Query cache with:
 * - All gates
 * - All gate details (13 gates)
 * - All route combinations (13 x 12 = 156 routes)
 *
 * Skips prefetching if cache is already complete (data cached within staleTime).
 * Requests are throttled to avoid overwhelming the API.
 *
 * Returns a `forceRefresh` function to clear cache and re-prefetch all data.
 */
export function usePrefetchData() {
	const queryClient = useQueryClient()
	const hasPrefetched = useRef(false)

	useEffect(() => {
		// Only run once on mount
		if (hasPrefetched.current) return
		hasPrefetched.current = true

		// Start prefetching after a short delay to not block initial render
		const timeoutId = setTimeout(() => {
			prefetchAllData(queryClient)
		}, 1000)

		return () => clearTimeout(timeoutId)
	}, [queryClient])

	/**
	 * Force clear all cached data and re-prefetch everything.
	 * Use this for manual refresh from the UI.
	 */
	const forceRefresh = useCallback(async () => {
		console.log('[Prefetch] Force refresh triggered, clearing cache...')

		// Clear all queries from the cache
		queryClient.clear()

		// Re-prefetch everything, skipping the cache check
		await prefetchAllData(queryClient, { skipCacheCheck: true })
	}, [queryClient])

	return { forceRefresh }
}
