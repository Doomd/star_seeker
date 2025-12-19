import { Theme as Colors } from '@/constants/Colors'
import { useNetInfo } from '@react-native-community/netinfo'
import React from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function OfflineBanner() {
	const netInfo = useNetInfo()
	const insets = useSafeAreaInsets()

	if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === false) {
		return (
			<View
				className="absolute bottom-0 left-0 right-0 bg-destructive p-4"
				style={{ paddingBottom: insets.bottom + 16 }}
			>
				<Text className="text-center font-bold text-background">
					No Internet Connection
				</Text>
			</View>
		)
	}

	return null
}
