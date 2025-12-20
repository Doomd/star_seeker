import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import ProfileScreen from '../app/(tabs)/profile'
import { useUserStore } from '../store/useUserStore'

describe('ProfileScreen Integration', () => {
	beforeEach(() => {
		useUserStore.setState({
			favorites: [],
			colorMode: 'dark',
		})
	})

	it('should display the number of favorites from the store', () => {
		useUserStore.setState({ favorites: ['SOL', 'TERRA'] })

		const { getByText } = render(<ProfileScreen />)
		expect(getByText('2')).toBeTruthy()
		expect(getByText('Favorite Gates')).toBeTruthy()
	})

	it('should change color mode when buttons are pressed', () => {
		const { getByText } = render(<ProfileScreen />)

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
})
