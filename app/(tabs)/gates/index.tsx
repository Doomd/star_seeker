import { GateCard } from '@/components/GateCard'
import { useGates } from '@/hooks/useQueries'
import { useIsDark, useThemeColor } from '@/hooks/useThemeColor'
import { useUserStore } from '@/store/useUserStore'
import { useState } from 'react'
import {
	ActivityIndicator,
	FlatList,
	Pressable,
	StatusBar,
	Text,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
	const { favorites } = useUserStore()
	const [showFavorites, setShowFavorites] = useState(false)
	const isDark = useIsDark()
	const Colors = useThemeColor()
	const { data: gates, isLoading, error } = useGates()

	const filteredGates =
		showFavorites && gates
			? gates.filter((gate) => favorites.includes(gate.code))
			: gates

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center bg-background">
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		)
	}

	if (error) {
		return (
			<View className="flex-1 items-center justify-center bg-background p-6">
				<Text className="mb-2 text-center text-lg text-destructive">
					Error loading gates
				</Text>
				<Text className="text-center text-foreground-muted">
					{(error as Error).message}
				</Text>
			</View>
		)
	}

	return (
		<SafeAreaView className="flex-1 bg-background" edges={['top']}>
			<StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
			<View className="flex-1 px-4 py-4">
				<View className="mb-6 flex-row items-center justify-between">
					<Text className="text-3xl font-bold text-foreground">Star Gates</Text>
					{favorites.length > 0 && (
						<Pressable
							onPress={() => setShowFavorites(!showFavorites)}
							className={`rounded-full px-4 py-2 ${
								showFavorites ? 'bg-primary' : 'bg-ui'
							}`}
						>
							<Text
								className={`font-bold ${
									showFavorites ? 'text-background' : 'text-foreground'
								}`}
							>
								{showFavorites ? 'All Gates' : 'Favorites'}
							</Text>
						</Pressable>
					)}
				</View>
				<FlatList
					data={filteredGates}
					keyExtractor={(item) => item.code}
					renderItem={({ item }) => <GateCard gate={item} />}
					className="p-1"
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={
						<Text className="mt-10 text-center text-foreground-muted">
							No gates found.
						</Text>
					}
				/>
			</View>
		</SafeAreaView>
	)
}
