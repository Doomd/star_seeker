import { useIsDark } from '@/hooks/useThemeColor'
import { Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { Stack } from 'expo-router'
import React from 'react'
import {
	Platform,
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

interface TabPageProps {
	title: string
	webTitle?: string // Optional browser tab title
	headerRight?: React.ReactNode
	children: React.ReactNode
	className?: string
	onBack?: () => void
	scrollable?: boolean
}

export default function TabPage({
	title,
	webTitle,
	headerRight,
	children,
	className = '',
	onBack,
	scrollable = true,
}: TabPageProps) {
	const isDark = useIsDark()
	const isFocused = useIsFocused()

	return (
		<SafeAreaView className="flex-1 bg-background" edges={['top']}>
			{Platform.OS === 'web' && isFocused && (
				<title>{`${webTitle || title} | Star Seeker`}</title>
			)}
			<Stack.Screen options={{ title: webTitle || title }} />
			<StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
			<View className={`flex-1 px-4 py-4 ${className}`}>
				<View className="mb-6 flex-row items-center justify-between">
					<View className="flex-row items-center flex-1 mr-2">
						{onBack && (
							<TouchableOpacity
								onPress={onBack}
								className="mr-3 p-1 rounded-full active:bg-ui"
							>
								<Ionicons
									name="chevron-back"
									size={28}
									color={isDark ? '#f8fafc' : '#0f172a'}
								/>
							</TouchableOpacity>
						)}
						<Text
							className="text-3xl font-bold text-foreground"
							numberOfLines={1}
						>
							{title}
						</Text>
					</View>
					{headerRight && <View>{headerRight}</View>}
				</View>
				{scrollable ? (
					<ScrollView
						className="flex-1"
						contentContainerClassName="gap-4"
						showsVerticalScrollIndicator={false}
					>
						{children}
					</ScrollView>
				) : (
					<View className="flex-1 gap-4">{children}</View>
				)}
			</View>
		</SafeAreaView>
	)
}
