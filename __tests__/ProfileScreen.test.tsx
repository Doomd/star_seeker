import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProfileScreen from '../app/(tabs)/profile'
import { useUserStore } from '../store/useUserStore'
import { DataPrefetcher } from '../components/DataPrefetcher'

// Create a fresh QueryClient for each test
const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				gcTime: 0,
			},
		},
	})

// Wrapper component that provides all required context
function TestWrapper({ children }: { children: React.ReactNode }) {
	const queryClient = createTestQueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			<DataPrefetcher>{children}</DataPrefetcher>
		</QueryClientProvider>
	)
}

describe('ProfileScreen Integration', () => {
	beforeEach(() => {
		useUserStore.setState({
			favorites: [],
			colorMode: 'dark',
		})
	})

	it('should display the number of favorites from the store', () => {
		useUserStore.setState({ favorites: ['SOL', 'TERRA'] })

		const { getByText } = render(
			<TestWrapper>
				<ProfileScreen />
			</TestWrapper>
		)
		expect(getByText('2')).toBeTruthy()
		expect(getByText('Favorite Gates')).toBeTruthy()
	})

	it('should change color mode when buttons are pressed', () => {
		const { getByText } = render(
			<TestWrapper>
				<ProfileScreen />
			</TestWrapper>
		)

		const lightButton = getByText('light')
		const darkButton = getByText('dark')

		// Initially dark (based on beforeEach)
		expect(useUserStore.getState().colorMode).toBe('dark')

		// Press light
		fireEvent.press(lightButton)
		expect(useUserStore.getState().colorMode).toBe('light')

		// Press dark
		fireEvent.press(darkButton)
		expect(useUserStore.getState().colorMode).toBe('dark')
	})

	it('should display cache statistics', () => {
		const { getByText } = render(
			<TestWrapper>
				<ProfileScreen />
			</TestWrapper>
		)

		// Initially no data cached
		expect(getByText('No data cached')).toBeTruthy()
		expect(getByText('Force Data Refresh')).toBeTruthy()
	})
})
