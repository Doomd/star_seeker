module.exports = {
	preset: 'react-native',
	setupFilesAfterEnv: ['./jest.setup.js'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
	},
	transformIgnorePatterns: [
		'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|nativewind|react-native-css-interop|@testing-library|react-native-reanimated|@react-native-async-storage)',
	],
}
