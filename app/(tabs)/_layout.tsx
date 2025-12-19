import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Theme as Colors } from '@/constants/Colors'

function TabBarIcon(props: {
	name: React.ComponentProps<typeof MaterialCommunityIcons>['name']
	color: string
}) {
	return <MaterialCommunityIcons size={28} {...props} />
}

export default function TabLayout() {
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
		</Tabs>
	)
}
