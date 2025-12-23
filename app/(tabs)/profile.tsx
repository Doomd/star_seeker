import { Theme as Colors } from '@/constants/Colors'
import { APP_VERSION } from '@/constants/version'
import { useUserStore } from '@/store/useUserStore'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { Platform, Pressable, Text, View, TouchableOpacity } from 'react-native'
import TabPage from '@/components/ui/TabPage'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useCacheStats } from '@/hooks/useCacheStats'
import { usePrefetch } from '@/components/DataPrefetcher'
import { useGates } from '@/hooks/useQueries'
import { useRouter } from 'expo-router'
import { FavoriteButton } from '@/components/ui/FavoriteButton'

export default function ProfileScreen() {
	const { favorites, colorMode, setColorMode } = useUserStore()
	const ColorsNative = useThemeColor()
	const cacheStats = useCacheStats()
	const { forceRefresh } = usePrefetch()
	const { data: gates } = useGates()
	const router = useRouter()

	// Get actual gate objects for favorites
	const favoriteGates = gates?.filter((g) => favorites.includes(g.code)) || []

	// Build cache description string
	const cacheDescription =
		cacheStats.gates > 0 || cacheStats.routes > 0
			? `${cacheStats.gates} Star Gates, ${cacheStats.routes} Route Combinations`
			: 'No data cached'

	return (
		<TabPage title="Profile">
			<View className="overflow-hidden rounded-2xl border border-ui bg-panel m-1 mb-8">
				<View className="border-b border-ui p-4 flex-row items-center justify-between">
					<Text className="text-lg font-bold text-foreground">Favorites</Text>
					<Text className="text-foreground-muted">
						{favorites.length} gates
					</Text>
				</View>
				{favoriteGates.length > 0 ? (
					<View>
						{favoriteGates.map((gate) => (
							<TouchableOpacity
								key={gate.code}
								className="flex-row items-center justify-between border-b border-ui p-4 last:border-b-0 active:bg-ui"
								onPress={() => router.push(`/gates/${gate.code}`)}
							>
								<View className="flex-row items-center gap-3">
									<MaterialCommunityIcons
										name="orbit"
										size={20}
										color={ColorsNative.primary}
									/>
									<View>
										<Text className="font-bold text-foreground">
											{gate.name}
										</Text>
										<Text className="text-xs text-foreground-muted">
											{gate.code}
										</Text>
									</View>
								</View>
								<View className="flex-row items-center gap-2">
									<FavoriteButton gateCode={gate.code} size={18} />
									<MaterialCommunityIcons
										name="chevron-right"
										size={20}
										color={ColorsNative.foreground.muted}
									/>
								</View>
							</TouchableOpacity>
						))}
					</View>
				) : (
					<View className="p-6 items-center">
						<MaterialCommunityIcons
							name="star-outline"
							size={32}
							color={ColorsNative.foreground.dim}
						/>
						<Text className="mt-2 text-foreground-muted text-center">
							No favorite gates yet
						</Text>
						<Text className="text-xs text-foreground-dim text-center mt-1">
							Tap the star on any gate to add it here
						</Text>
					</View>
				)}
			</View>

			<View className="rounded-2xl border border-ui bg-panel m-1">
				<View className="border-b border-ui p-4">
					<Text className="text-lg font-bold text-foreground">Preferences</Text>
				</View>

				<View className="p-4">
					<Text className="mb-3 text-sm font-medium text-foreground-muted">
						Color Mode
					</Text>

					<View className="flex-row overflow-hidden rounded-lg border border-ui">
						{(['light', 'dark'] as const).map((mode) => (
							<Pressable
								key={mode}
								onPress={() => setColorMode(mode)}
								className={`flex-1 items-center justify-center p-3 ${
									colorMode === mode ? 'bg-primary' : 'bg-panel'
								}`}
							>
								<Text
									className={`font-semibold capitalize ${
										colorMode === mode ? 'text-background' : 'text-foreground'
									}`}
								>
									{mode}
								</Text>
							</Pressable>
						))}
					</View>
				</View>
			</View>

			<View className="rounded-2xl border border-ui bg-panel m-1 mt-6">
				<View className="border-b border-ui p-4">
					<Text className="text-lg font-bold text-foreground">
						Offline Data
					</Text>
				</View>

				<View className="p-4">
					<Text className="mb-1 text-sm font-medium text-foreground-muted">
						API Cache
					</Text>
					<Text className="mb-3 text-xs text-primary">{cacheDescription}</Text>
					<Pressable
						onPress={forceRefresh}
						className="flex-row items-center justify-center rounded-lg border border-[#00d9ff] p-4 active:bg-primary"
					>
						{({ pressed }) => (
							<>
								<MaterialCommunityIcons
									name="database-sync-outline"
									size={20}
									color={
										pressed ? ColorsNative.background : ColorsNative.primary
									}
								/>
								<Text
									className={`ml-2 font-bold ${pressed ? 'text-background' : 'text-primary'}`}
								>
									Force Data Refresh
								</Text>
							</>
						)}
					</Pressable>
					<Text className="mt-2 text-center text-[10px] text-foreground-dim uppercase tracking-tighter">
						Clears cache and re-downloads all gate and route data
					</Text>
				</View>
			</View>

			<View className="mt-8 mb-6 items-center">
				<Text className="text-foreground-dim text-xs tracking-widest uppercase">
					Star Seeker v
					{Platform.OS === 'web'
						? APP_VERSION
						: Constants.expoConfig?.version || APP_VERSION}
				</Text>
			</View>
		</TabPage>
	)
}
