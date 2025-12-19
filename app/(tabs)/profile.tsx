import { Theme as Colors } from '@/constants/Colors'
import { useUserStore } from '@/store/useUserStore'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {
	const { favorites, colorMode, setColorMode } = useUserStore()

	return (
		<SafeAreaView className="flex-1 bg-background" edges={['top']}>
			<StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
			<View className="flex-1 px-6 py-6">
				<Text className="mb-8 text-3xl font-bold text-foreground">Profile</Text>

				<View className="mb-8 overflow-hidden rounded-2xl border border-ui bg-panel">
					<View className="border-b border-ui p-4">
						<Text className="text-lg font-bold text-foreground">Stats</Text>
					</View>
					<View className="flex-row items-center p-6">
						<View className="mr-4 rounded-full bg-ui p-3">
							<MaterialCommunityIcons name="star" size={24} color="#fbbf24" />
						</View>
						<View>
							<Text className="text-3xl font-bold text-foreground">
								{favorites.length}
							</Text>
							<Text className="text-foreground-muted">Favorite Gates</Text>
						</View>
					</View>
				</View>

				<View className="rounded-2xl border border-ui bg-panel">
					<View className="border-b border-ui p-4">
						<Text className="text-lg font-bold text-foreground">
							Preferences
						</Text>
					</View>

					<View className="p-4">
						<Text className="mb-3 text-sm font-medium text-foreground-muted">
							Color Mode
						</Text>
						<View className="flex-row overflow-hidden rounded-lg border border-ui">
							{(['system', 'light', 'dark'] as const).map((mode) => (
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
			</View>
		</SafeAreaView>
	)
}
