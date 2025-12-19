import { useThemeColor } from '@/hooks/useThemeColor'
import { useUserStore } from '@/store/useUserStore'
import { Gate } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

interface GateCardProps {
	gate: Gate
}

export function GateCard({ gate }: GateCardProps) {
	const Colors = useThemeColor()
	const { favorites, toggleFavorite } = useUserStore()
	const isFavorite = favorites.includes(gate.code)

	return (
		<Link href={`/gates/${gate.code}`} asChild>
			<Pressable className="mb-3 flex-row items-center justify-between rounded-xl bg-ui p-4 active:bg-ui-active">
				<View className="flex-1">
					<Text className="mb-1 text-xl font-bold text-foreground">
						{gate.name}
					</Text>
					<Text className="text-sm text-foreground-muted">
						{gate.links.length} Connections
					</Text>
				</View>
				<View className="flex-row items-center gap-3">
					<Text className="rounded bg-primary-muted px-2 py-0.5 font-mono text-sm font-bold text-primary">
						{gate.code}
					</Text>
					<Pressable
						onPress={(e) => {
							e.stopPropagation()
							toggleFavorite(gate.code)
						}}
						className="p-1"
					>
						<Ionicons
							name={isFavorite ? 'star' : 'star-outline'}
							size={24}
							color={isFavorite ? '#fbbf24' : Colors.foreground.dim}
						/>
					</Pressable>
				</View>
			</Pressable>
		</Link>
	)
}
