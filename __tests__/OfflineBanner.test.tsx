import React from 'react'
import { render } from '@testing-library/react-native'
import { OfflineBanner } from '../components/OfflineBanner'
import { useNetInfo } from '@react-native-community/netinfo'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// Mock the hooks
jest.mock('@react-native-community/netinfo', () => ({
	useNetInfo: jest.fn(),
}))

jest.mock('react-native-safe-area-context', () => ({
	useSafeAreaInsets: jest.fn(),
}))

describe('OfflineBanner', () => {
	beforeEach(() => {
		;(useSafeAreaInsets as jest.Mock).mockReturnValue({
			bottom: 0,
			top: 0,
			left: 0,
			right: 0,
		})
	})

	it('should not render when online', () => {
		;(useNetInfo as jest.Mock).mockReturnValue({
			type: 'wifi',
			isInternetReachable: true,
		})

		const { queryByText } = render(<OfflineBanner />)
		expect(queryByText('No Internet Connection')).toBeNull()
	})

	it('should render when offline', () => {
		;(useNetInfo as jest.Mock).mockReturnValue({
			type: 'wifi',
			isInternetReachable: false,
		})

		const { getByText } = render(<OfflineBanner />)
		expect(getByText('No Internet Connection')).toBeTruthy()
	})

	it('should not render when connection type is unknown', () => {
		;(useNetInfo as jest.Mock).mockReturnValue({
			type: 'unknown',
			isInternetReachable: false,
		})

		const { queryByText } = render(<OfflineBanner />)
		expect(queryByText('No Internet Connection')).toBeNull()
	})
})
