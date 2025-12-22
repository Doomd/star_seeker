import { useThemeColor } from '@/hooks/useThemeColor'
import { Stack } from 'expo-router'

export default function GatesLayout() {
	const Colors = useThemeColor()

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
