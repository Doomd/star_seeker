import { useUserStore } from '../store/useUserStore'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Since we're using a persisted store, we might want to clear it before each test
// However, zustand's persist middleware makes this a bit tricky in tests.
// For simple unit tests of the actions, we can just test the state changes.

describe('useUserStore', () => {
	beforeEach(() => {
		// Reset the store to initial state if possible, or just clear AsyncStorage
		AsyncStorage.clear()
		const { setState } = useUserStore
		setState({
			favorites: [],
			colorMode: 'dark',
			calculatorSettings: {
				distance: '',
				passengers: '2',
				parking: '3',
			},
			_hasHydrated: false,
		})
	})

	it('should have initial state', () => {
		const state = useUserStore.getState()
		expect(state.favorites).toEqual([])
		expect(state.colorMode).toBe('dark')
		expect(state.calculatorSettings.passengers).toBe('2')
	})

	it('should toggle favorites', () => {
		const { toggleFavorite } = useUserStore.getState()

		toggleFavorite('SOL')
		expect(useUserStore.getState().favorites).toContain('SOL')

		toggleFavorite('SOL')
		expect(useUserStore.getState().favorites).not.toContain('SOL')
	})

	it('should set color mode', () => {
		const { setColorMode } = useUserStore.getState()

		setColorMode('light')
		expect(useUserStore.getState().colorMode).toBe('light')

		setColorMode('dark')
		expect(useUserStore.getState().colorMode).toBe('dark')
	})

	it('should update calculator settings', () => {
		const { setCalculatorSettings } = useUserStore.getState()

		setCalculatorSettings({ distance: '100', passengers: '4' })
		const settings = useUserStore.getState().calculatorSettings

		expect(settings.distance).toBe('100')
		expect(settings.passengers).toBe('4')
		expect(settings.parking).toBe('3') // remained unchanged
	})
})
