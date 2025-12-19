import { useThemeColor } from '@/hooks/useThemeColor'
import { useUserStore } from '@/store/useUserStore'
import { Gate } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { Platform, Pressable, Text, View } from 'react-native'

interface GateCardProps {
	gate: Gate
}

export function GateCard({ gate }: GateCardProps) {
	const Colors = useThemeColor()
	const { favorites, toggleFavorite } = useUserStore()
	const isFavorite = favorites.includes(gate.code)

	return (
		<Link href={`/gates/${gate.code}`} asChild>
			<Pressable className="mb-3 flex-row justify-between rounded-xl bg-ui active:bg-ui-active overflow-hidden">
				<View className="flex-1 flex-row items-center justify-between p-4 pr-0">
					<View className="flex-1">
						<Text className="mb-1 text-xl font-bold text-foreground">
							{gate.name}
						</Text>
						<Text className="text-sm text-foreground-muted">
							{gate.links.length} Connections
						</Text>
					</View>

					<Text className="rounded bg-primary-muted px-2 py-0.5 font-mono text-sm font-bold text-primary">
						{gate.code}
					</Text>
				</View>

				<Pressable
					onPress={(e) => {
						if (Platform.OS === 'web') e.preventDefault()
						e.stopPropagation()
						toggleFavorite(gate.code)
					}}
					className="pl-3 pr-4 justify-center"
				>
					<Ionicons
						name={isFavorite ? 'star' : 'star-outline'}
						size={24}
						color={isFavorite ? '#fbbf24' : Colors.foreground.dim}
					/>
				</Pressable>
			</Pressable>
		</Link>
	)
}
