import { useNetInfo } from '@react-native-community/netinfo'
import { Ionicons } from '@expo/vector-icons'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Text, View, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useThemeColor } from '@/hooks/useThemeColor'

// memo prevents unnecessary re-renders from parent
export const OfflineBanner = memo(function OfflineBanner() {
	const netInfo = useNetInfo()
	const insets = useSafeAreaInsets()
	const Colors = useThemeColor()
	const [isDismissed, setIsDismissed] = useState(false)

	// Reset dismissed state when connection is restored - allows banner to show again on next disconnect
	useEffect(() => {
		if (netInfo.isInternetReachable === true) {
			setIsDismissed(false)
		}
	}, [netInfo.isInternetReachable])

	// useCallback for stable function reference - prevents new function on each render
	const handleDismiss = useCallback(() => {
		setIsDismissed(true)
	}, [])

	// Determine if banner should show
	const isOffline =
		netInfo.type !== 'unknown' && netInfo.isInternetReachable === false

	// Early return guard clause - clearer control flow than nested conditionals
	if (!isOffline || isDismissed) {
		return null
	}

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
						onPress={handleDismiss}
						hitSlop={12}
						accessibilityLabel="Dismiss offline banner"
						accessibilityRole="button"
					>
						{/* Use theme color instead of hardcoded value */}
						<Ionicons name="close" size={20} color={Colors.background} />
					</Pressable>
				</View>
			</View>
		</View>
	)
})
