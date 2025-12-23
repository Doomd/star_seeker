import { FavoriteButton } from '@/components/ui/FavoriteButton'
import { DualActionButton } from '@/components/ui/DualActionButton'
import { useGateDetails } from '@/hooks/useQueries'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useUserStore } from '@/store/useUserStore'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect } from 'react'
import {
	ActivityIndicator,
	Platform,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import TabPage from '@/components/ui/TabPage'

export default function GateDetailsScreen() {
	const Colors = useThemeColor()
	const { code } = useLocalSearchParams<{ code: string }>()
	const router = useRouter()
	const { data: gate, isLoading, error, refetch } = useGateDetails(code || '')
	const { favorites } = useUserStore()

	// Set browser tab title for web
	useEffect(() => {
		if (Platform.OS === 'web' && gate?.name) {
			document.title = `${gate.name} | Star Seeker`
		}
	}, [gate?.name])

	if (isLoading) {
		return (
			<TabPage title={code || 'Loading...'} onBack={() => router.back()}>
				<View className="flex-1 items-center justify-center py-20">
					<ActivityIndicator size="large" color={Colors.primary} />
				</View>
			</TabPage>
		)
	}

	if (error || !gate) {
		return (
			<TabPage title="Error" onBack={() => router.back()}>
				<View className="flex-1 items-center justify-center py-20">
					<Ionicons
						name="alert-circle-outline"
						size={48}
						color={Colors.destructive}
					/>
					<Text className="mt-4 text-center text-lg font-bold text-foreground">
						Failed to load gate details
					</Text>
					<TouchableOpacity
						className="mt-6 rounded-lg bg-ui px-6 py-3 active:bg-ui-active"
						onPress={() => refetch()}
					>
						<Text className="font-bold text-primary">Retry</Text>
					</TouchableOpacity>
				</View>
			</TabPage>
		)
	}

	return (
		<TabPage title={gate.name} onBack={() => router.back()}>
			<View className="rounded-2xl border border-ui bg-panel p-6">
				<View className="flex-row items-center justify-between">
					<View className="flex-row items-center justify-start gap-4">
						<View className="rounded-full bg-primary/10 p-3">
							<MaterialCommunityIcons
								name="orbit"
								size={32}
								color={Colors.primary}
							/>
						</View>
						<View>
							<Text
								accessibilityRole="header"
								aria-level={1}
								className="font-mono text-3xl font-bold text-primary"
							>
								{gate.code}
							</Text>
							<Text className="text-sm tracking-wider uppercase text-foreground-muted">
								Gate Code
							</Text>
						</View>
					</View>
					<FavoriteButton gateCode={gate.code} className="p-3" size={32} />
				</View>
			</View>

			<DualActionButton
				left={{
					label: 'Start from Here',
					icon: 'planet-outline',
					onPress: () => router.push(`/(tabs)/routes?from=${gate.code}`),
				}}
				right={{
					label: 'End Here',
					icon: 'flag-outline',
					onPress: () => router.push(`/(tabs)/routes?to=${gate.code}`),
				}}
				separator="OR"
			/>

			<View>
				<Text className="mb-4 text-xl font-bold text-foreground">
					Connections
				</Text>
				<View className="gap-3">
					{gate.links && gate.links.length > 0 ? (
						gate.links.map((link) => (
							<TouchableOpacity
								key={link.code}
								onPress={() => router.push(`/gates/${link.code}`)}
								className="flex-row items-center justify-between rounded-xl bg-ui p-4 active:bg-ui-active"
							>
								<View className="flex-row items-center gap-3">
									<Ionicons
										name="arrow-forward-circle"
										size={24}
										color={Colors.foreground.dim}
									/>
									<View>
										<Text className="font-mono text-lg text-foreground">
											{link.code}
										</Text>
										<Text className="text-xs text-foreground-dim">
											HYPER JUMP
										</Text>
									</View>
								</View>
								<View className="flex-row items-center gap-2">
									<Text className="text-xs text-foreground-dim">
										{link.hu} HU
									</Text>
									<Ionicons
										name="chevron-forward"
										size={20}
										color={Colors.foreground.dim}
									/>
								</View>
							</TouchableOpacity>
						))
					) : (
						<Text className="italic text-foreground-dim">
							No direct connections available.
						</Text>
					)}
				</View>
			</View>
		</TabPage>
	)
}
