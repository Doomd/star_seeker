import { useIsDark } from '@/hooks/useThemeColor'
import React from 'react'
import { StatusBar, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface TabPageProps {
	title: string
	headerRight?: React.ReactNode
	children: React.ReactNode
	className?: string
}

export default function TabPage({
	title,
	headerRight,
	children,
	className = '',
}: TabPageProps) {
	const isDark = useIsDark()

	return (
		<SafeAreaView className="flex-1 bg-background" edges={['top']}>
			<StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
			<View className={`flex-1 px-4 py-4 ${className}`}>
				<View className="mb-6 flex-row items-center justify-between">
					<Text className="text-3xl font-bold text-foreground">{title}</Text>
					{headerRight && <View>{headerRight}</View>}
				</View>
				<View className="flex-1">{children}</View>
			</View>
		</SafeAreaView>
	)
}
