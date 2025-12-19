import { useGateDetails } from '@/hooks/useQueries'
import { Ionicons } from '@expo/vector-icons'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import {
	ActivityIndicator,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Theme as Colors } from '@/constants/Colors'

export default function GateDetailsScreen() {
	const { code } = useLocalSearchParams<{ code: string }>()
	const router = useRouter()
	const { data: gate, isLoading, error } = useGateDetails(code || '')

	return (
		<View className="flex-1 items-center justify-center bg-background">
			<Stack.Screen
				options={{
					headerTitle: code,
					headerStyle: { backgroundColor: Colors.panel },
					headerTintColor: Colors.foreground.DEFAULT,
				}}
			/>
			<ActivityIndicator size="large" color="#22d3ee" />
		</View>
	)

	if (error || !gate) {
		return (
			<View className="flex-1 items-center justify-center bg-background p-6">
				<Stack.Screen options={{ headerShown: false }} />
				<Text className="mb-2 text-center text-lg text-destructive">
					Error loading details
				</Text>
				<TouchableOpacity onPress={() => router.back()}>
					<Text className="mt-4 text-blue-400">Go Back</Text>
				</TouchableOpacity>
			</View>
		)
	}

	return (
		<SafeAreaView className="flex-1 bg-background">
			{/* Dynamic Header */}
			<Stack.Screen
				options={{
					headerTitle: gate.name,
					headerStyle: { backgroundColor: Colors.panel },
					headerTintColor: Colors.foreground.DEFAULT,
				}}
			/>

			<ScrollView className="flex-1 p-4">
				<View className="mb-6 rounded-2xl border border-ui bg-panel p-6">
					<View className="mb-4 flex-row items-start justify-between">
						<View>
							<Text className="mb-1 text-sm tracking-wider uppercase text-foreground-muted">
								Gate Code
							</Text>
							<Text className="font-mono text-3xl font-bold text-primary">
								{gate.code}
							</Text>
						</View>
						<Ionicons
							name="planet"
							size={48}
							color="#22d3ee"
							style={{ opacity: 0.8 }}
						/>
					</View>
				</View>

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
										color="#94a3b8"
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
									<Ionicons name="chevron-forward" size={20} color="#64748b" />
								</View>
							</TouchableOpacity>
						))
					) : (
						<Text className="italic text-foreground-dim">
							No direct connections available.
						</Text>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
