import { useThemeColor } from '@/hooks/useThemeColor'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs, useRouter } from 'expo-router'
import React from 'react'

function TabBarIcon(props: {
	name: React.ComponentProps<typeof MaterialCommunityIcons>['name']
	color: string
}) {
	return <MaterialCommunityIcons size={28} {...props} />
}

export default function TabLayout() {
	const Colors = useThemeColor()
	const router = useRouter()

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
				name="gates"
				options={{
					title: 'Gates',
					tabBarIcon: ({ color }) => <TabBarIcon name="orbit" color={color} />,
				}}
				listeners={{
					tabPress: (e) => {
						// Always navigate to the root index of the gates tab
						e.preventDefault()
						router.navigate('/(tabs)/gates')
					},
				}}
			/>
			<Tabs.Screen
				name="calculator"
				options={{
					title: 'Cost',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="calculator-variant-outline" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="routes"
				options={{
					title: 'Route Finder',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="map-marker-path" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="account" color={color} />
					),
				}}
			/>
		</Tabs>
	)
}
