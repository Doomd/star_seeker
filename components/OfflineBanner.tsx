import { useNetInfo } from '@react-native-community/netinfo'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, View, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function OfflineBanner() {
	const netInfo = useNetInfo()
	const insets = useSafeAreaInsets()
	const [isDismissed, setIsDismissed] = useState(false)

	if (
		netInfo.type !== 'unknown' &&
		netInfo.isInternetReachable === false &&
		!isDismissed
	) {
		return (
			<View
				className="absolute top-0 left-0 right-0 z-50 bg-destructive"
				style={{ paddingTop: insets.top }}
			>
				<View className="flex-row items-center justify-between px-4 py-3">
					<View className="flex-1" />
					<Text className="font-bold text-background">
						No Internet Connection
					</Text>
					<View className="flex-1 items-end">
						<Pressable
							onPress={() => setIsDismissed(true)}
							hitSlop={12}
							accessibilityLabel="Dismiss offline banner"
							accessibilityRole="button"
						>
							<Ionicons name="close" size={20} color="#0c1220" />
						</Pressable>
					</View>
				</View>
			</View>
		)
	}

	return null
}
