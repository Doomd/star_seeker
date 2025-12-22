import { useIsDark } from '@/hooks/useThemeColor'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface TabPageProps {
	title: string
	headerRight?: React.ReactNode
	children: React.ReactNode
	className?: string
	onBack?: () => void
}

export default function TabPage({
	title,
	headerRight,
	children,
	className = '',
	onBack,
}: TabPageProps) {
	const isDark = useIsDark()

	return (
		<SafeAreaView className="flex-1 bg-background" edges={['top']}>
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
				<View className="flex-1">{children}</View>
			</View>
		</SafeAreaView>
	)
}
