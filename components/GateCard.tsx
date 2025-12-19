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
		<View className="mb-3 flex-row rounded-xl bg-ui overflow-hidden">
			<Link href={`/gates/${gate.code}`} asChild>
				<Pressable
					onPress={() => {
						if (Platform.OS === 'web') {
							// Explicitly blur the current element to prevent focus being trapped
							// on a screen that becomes aria-hidden during navigation.
							;(document.activeElement as HTMLElement)?.blur()
						}
					}}
					className="flex-1 flex-row items-center justify-between p-4 pr-0 active:bg-ui-active"
				>
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
				</Pressable>
			</Link>

			<Pressable
				onPress={(e) => {
					if (Platform.OS === 'web') e.preventDefault()
					e.stopPropagation()
					toggleFavorite(gate.code)
				}}
				className="p-2 m-2 justify-center active:bg-ui-active rounded-lg"
			>
				<Ionicons
					name={isFavorite ? 'star' : 'star-outline'}
					size={24}
					color={isFavorite ? Colors.favorite : Colors.foreground.dim}
				/>
			</Pressable>
		</View>
	)
}
