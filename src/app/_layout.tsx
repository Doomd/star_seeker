import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useMemo } from 'react'
import 'react-native-reanimated'
import './global.css'

import { DataPrefetcher } from '@/components/DataPrefetcher'
import { QueryProvider } from '@/components/QueryProvider'
import { OfflineBanner } from '@/components/OfflineBanner'
import { useIsDark, useThemeColor } from '@/hooks/useThemeColor'
import { useUserStore } from '@/store/useUserStore'
import { onlineManager } from '@tanstack/react-query'
import NetInfo from '@react-native-community/netinfo'
import { LogBox, View as RNView } from 'react-native'
import { useColorScheme } from 'nativewind'

LogBox.ignoreLogs(['props.pointerEvents is deprecated'])

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

// 🌟 Easter egg: seasonal greetings for developers exploring the code
const SEASONAL_MESSAGES: Record<string, string> = {
	'12-25':
		'🎄 Merry Christmas, Star Seeker! May your routes be merry and your He3 costs low.',
	'12-31':
		'🎆 Happy New Year! May your journeys through the gates bring you to wonderful destinations.',
	'01-01': '✨ New year, new routes to explore! The galaxy awaits.',
	'10-31':
		'🎃 Happy Halloween! Even the spookiest gates have the best candy on the other side.',
	'03-14':
		'🥧 Happy Pi Day! The circumference of a Hyper Gate is approximately 2πr.',
}
const today = new Date()
const dateKey = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
if (SEASONAL_MESSAGES[dateKey]) {
	console.log(SEASONAL_MESSAGES[dateKey])
}

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	})

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	const hasHydrated = useUserStore((state) => state._hasHydrated)

	useEffect(() => {
		if (loaded && hasHydrated) {
			SplashScreen.hideAsync()
		}
	}, [loaded, hasHydrated])

	if (!loaded || !hasHydrated) {
		return null
	}

	return <RootLayoutNav />
}

function RootLayoutNav() {
	const Colors = useThemeColor()
	const isDark = useIsDark()
	const colorMode = useUserStore((state) => state.colorMode)
	const { setColorScheme } = useColorScheme()

	// Setup network listener once on mount - moved from module scope to avoid side effects on import
	useEffect(() => {
		const unsubscribe = onlineManager.setEventListener((setOnline) => {
			return NetInfo.addEventListener((state) => {
				setOnline(!!state.isConnected)
			})
		})
		// Cleanup on unmount
		return unsubscribe
	}, [])

	// Sync NativeWind with our store - removed colorScheme from deps to prevent infinite loop
	useEffect(() => {
		setColorScheme(colorMode)
	}, [colorMode, setColorScheme])

	// Memoize screen options - prevents new object creation on every render
	const screenOptions = useMemo(
		() => ({
			headerStyle: { backgroundColor: Colors.panel },
			headerTintColor: Colors.foreground.DEFAULT,
			headerShown: false,
		}),
		[Colors.panel, Colors.foreground.DEFAULT]
	)

	return (
		<QueryProvider>
			<DataPrefetcher>
				<ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
					{/* key={colorMode} forces re-render on theme change for NativeWind */}
					<RNView className={`flex-1 ${isDark ? 'dark' : ''}`} key={colorMode}>
						<Stack screenOptions={screenOptions}>
							<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						</Stack>
						<StatusBar style={isDark ? 'light' : 'dark'} />
						<OfflineBanner />
					</RNView>
				</ThemeProvider>
			</DataPrefetcher>
		</QueryProvider>
	)
}
