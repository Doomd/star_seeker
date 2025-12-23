import { usePrefetchData } from '@/hooks/usePrefetchData'
import React, { createContext, useContext } from 'react'

interface PrefetchContextValue {
	forceRefresh: () => Promise<void>
}

const PrefetchContext = createContext<PrefetchContextValue | null>(null)

/**
 * Hook to access the prefetch functions from any component.
 */
export function usePrefetch() {
	const context = useContext(PrefetchContext)
	if (!context) {
		throw new Error('usePrefetch must be used within a DataPrefetcher')
	}
	return context
}

/**
 * Component that triggers background data prefetching and provides
 * a context for manual refresh. Place inside QueryProvider.
 */
export function DataPrefetcher({ children }: { children?: React.ReactNode }) {
	const { forceRefresh } = usePrefetchData()

	return (
		<PrefetchContext.Provider value={{ forceRefresh }}>
			{children}
		</PrefetchContext.Provider>
	)
}
