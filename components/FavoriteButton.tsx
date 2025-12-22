import { useThemeColor } from '@/hooks/useThemeColor'
import { useUserStore } from '@/store/useUserStore'
import { Ionicons } from '@expo/vector-icons'
import { Platform, Pressable } from 'react-native'

interface FavoriteButtonProps {
	gateCode: string
	size?: number
	className?: string
}

export function FavoriteButton({
	gateCode,
	size = 24,
	className = '',
}: FavoriteButtonProps) {
	const Colors = useThemeColor()
	const { favorites, toggleFavorite } = useUserStore()
	const isFavorite = favorites.includes(gateCode)

	return (
		<Pressable
			onPress={(e) => {
				if (Platform.OS === 'web') e.preventDefault()
				e.stopPropagation()
				toggleFavorite(gateCode)
			}}
			className={`justify-center active:bg-ui-active rounded-lg ${className}`}
		>
			<Ionicons
				name={isFavorite ? 'star' : 'star-outline'}
				size={size}
				color={isFavorite ? Colors.favorite : Colors.foreground.dim}
			/>
		</Pressable>
	)
}
