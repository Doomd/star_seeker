import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'

interface HeaderButtonProps {
	label: string
	onPress: () => void
	isActive?: boolean
}

export function HeaderButton({
	label,
	onPress,
	isActive = false,
}: HeaderButtonProps) {
	return (
		<Pressable
			onPress={onPress}
			className={`rounded-full px-4 py-2 ${isActive ? 'bg-primary' : 'bg-ui'}`}
		>
			<Text
				className={`font-bold ${
					isActive ? 'text-background' : 'text-foreground'
				}`}
			>
				{label}
			</Text>
		</Pressable>
	)
}
