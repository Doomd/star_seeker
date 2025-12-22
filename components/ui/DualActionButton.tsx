import { useThemeColor } from '@/hooks/useThemeColor'
import { Ionicons } from '@expo/vector-icons'
import { ReactNode } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface ActionConfig {
	label: string
	subLabel?: string
	icon: keyof typeof Ionicons.glyphMap
	onPress: () => void
	highlight?: string
}

interface DualActionButtonProps {
	left: ActionConfig
	right: ActionConfig
	separator: string | ReactNode
}

export function DualActionButton({
	left,
	right,
	separator,
}: DualActionButtonProps) {
	const Colors = useThemeColor()

	const RenderButton = ({ config }: { config: ActionConfig }) => (
		<TouchableOpacity
			className="h-32 flex-1 items-center justify-center rounded-xl border border-ui bg-ui p-4 active:bg-ui-active"
			onPress={config.onPress}
		>
			{config.highlight ? (
				<>
					<Text className="mb-2 text-3xl font-bold text-primary">
						{config.highlight}
					</Text>
					<Text
						className="text-center text-sm text-foreground-muted"
						numberOfLines={1}
					>
						{config.label}
					</Text>
				</>
			) : (
				<>
					<Ionicons
						name={config.icon}
						size={32}
						color={Colors.foreground.muted}
					/>
					<Text className="mt-2 text-foreground-muted">{config.label}</Text>
				</>
			)}
		</TouchableOpacity>
	)

	return (
		<View className="flex-row items-center justify-between gap-4">
			<RenderButton config={left} />

			<View className="items-center justify-center">
				{typeof separator === 'string' ? (
					<Text className="font-bold text-foreground-muted">{separator}</Text>
				) : (
					separator
				)}
			</View>

			<RenderButton config={right} />
		</View>
	)
}
