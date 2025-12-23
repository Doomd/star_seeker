import { Stack } from 'expo-router'

export default function GatesLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="index"
				options={{ headerShown: false, title: 'Gates' }}
			/>
			<Stack.Screen name="[code]" />
		</Stack>
	)
}
