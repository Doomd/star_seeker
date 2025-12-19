import { Theme as Colors } from '@/constants/Colors'
import { Stack } from 'expo-router'

export default function GatesLayout() {
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors.panel,
				},
				headerTintColor: Colors.foreground.DEFAULT,
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}
		>
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	)
}
