import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { useColorScheme } from 'react-native'

function TabBarIcon(props: {
	name: React.ComponentProps<typeof Ionicons>['name']
	color: string
}) {
	return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
	const colorScheme = useColorScheme()

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: '#22d3ee', // Cyan-400
				tabBarStyle: {
					backgroundColor: '#0f172a', // Slate-900
					borderTopColor: '#1e293b', // Slate-800
				},
				headerStyle: {
					backgroundColor: '#0f172a',
				},
				headerTintColor: '#fff',
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Gates',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="planet-outline" color={color} />
					),
				}}
			/>
		</Tabs>
	)
}
