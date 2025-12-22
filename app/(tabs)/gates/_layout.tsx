import { useThemeColor } from '@/hooks/useThemeColor'
import { Stack } from 'expo-router'

export default function GatesLayout() {
	const Colors = useThemeColor()

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
				headerBackVisible: true,
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
