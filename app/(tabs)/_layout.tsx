import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { useColorScheme } from 'react-native'
import { Theme as Colors } from '@/constants/Colors'

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
				tabBarActiveTintColor: Colors.primary,
				tabBarStyle: {
					backgroundColor: Colors.panel,
					borderTopColor: Colors.ui,
				},
				headerStyle: {
					backgroundColor: Colors.panel,
				},
				headerTintColor: Colors.foreground.DEFAULT,
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
