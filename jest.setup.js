import '@testing-library/jest-native/extend-expect'

jest.mock('@react-native-async-storage/async-storage', () =>
	require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

// Mocking Expo and React Native modules
jest.mock('expo-font')
jest.mock('expo-asset')
jest.mock('expo-constants', () => ({
	expoConfig: {
		extra: {},
	},
}))

jest.mock('@expo/vector-icons', () => ({
	Ionicons: 'Ionicons',
	MaterialCommunityIcons: 'MaterialCommunityIcons',
	FontAwesome: 'FontAwesome',
}))

jest.mock('react-native-reanimated', () => {
	const Reanimated = require('react-native-reanimated/mock')
	Reanimated.default.call = () => {}
	return Reanimated
})

jest.mock('expo-router', () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		back: jest.fn(),
	}),
	useLocalSearchParams: () => ({}),
	Stack: {
		Screen: jest.fn(() => null),
	},
	Link: 'Link',
}))

jest.mock('expo-status-bar', () => ({
	StatusBar: 'StatusBar',
}))

// Mock NativeWind
jest.mock('nativewind', () => ({
	useColorScheme: () => ({
		colorScheme: 'dark',
		setColorScheme: jest.fn(),
		toggleColorScheme: jest.fn(),
	}),
}))
