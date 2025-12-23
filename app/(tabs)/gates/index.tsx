import { GateCard } from '@/components/GateCard'
import { HeaderButton } from '@/components/ui/HeaderButton'
import { useGates } from '@/hooks/useQueries'
import { useIsDark, useThemeColor } from '@/hooks/useThemeColor'
import { useUserStore } from '@/store/useUserStore'
import { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	FlatList,
	Platform,
	StatusBar,
	Text,
	View,
} from 'react-native'
import TabPage from '@/components/ui/TabPage'

export default function HomeScreen() {
	const { favorites } = useUserStore()
	const [showFavorites, setShowFavorites] = useState(false)
	const isDark = useIsDark()
	const Colors = useThemeColor()
	const { data: gates, isLoading, error } = useGates()

	// Set browser tab title for web
	useEffect(() => {
		if (Platform.OS === 'web') {
			document.title = 'Star Gates | Star Seeker'
		}
	}, [])

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
		<TabPage
			title="Star Gates"
			scrollable={false}
			headerRight={
				favorites.length > 0 ? (
					<HeaderButton
						label={showFavorites ? 'All Gates' : 'Favorites'}
						onPress={() => setShowFavorites(!showFavorites)}
						isActive={showFavorites}
					/>
				) : null
			}
		>
			<FlatList
				data={filteredGates}
				keyExtractor={(item) => item.code}
				renderItem={({ item }) => <GateCard gate={item} />}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={
					<Text className="mt-10 text-center text-foreground-muted">
						No gates found.
					</Text>
				}
			/>
		</TabPage>
	)
}
