import { usePrefetchData } from '@/hooks/usePrefetchData'

/**
 * Invisible component that triggers background data prefetching.
 * Place inside QueryProvider to enable offline caching of API data.
 */
export function DataPrefetcher() {
	usePrefetchData()
	return null
}
