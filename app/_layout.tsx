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
import { useEffect } from 'react'
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

onlineManager.setEventListener((setOnline) => {
	return NetInfo.addEventListener((state) => {
		setOnline(!!state.isConnected)
	})
})

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
	// Use our new hook to get the active theme colors based on store/system
	const Colors = useThemeColor()
	const isDark = useIsDark()
	const { colorMode } = useUserStore()
	const { colorScheme, setColorScheme } = useColorScheme()

	// Sync NativeWind with our store
	useEffect(() => {
		setColorScheme(colorMode)
	}, [colorMode, setColorScheme, colorScheme])

	return (
		<QueryProvider>
			<DataPrefetcher />
			<ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
				<RNView
					className={`flex-1 ${colorMode === 'dark' ? 'dark' : ''}`}
					key={colorMode}
				>
					<Stack
						screenOptions={{
							headerStyle: { backgroundColor: Colors.panel },
							headerTintColor: Colors.foreground.DEFAULT,
							headerShown: false,
						}}
					>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						{/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
					</Stack>
					<StatusBar style={isDark ? 'light' : 'dark'} />
					<OfflineBanner />
				</RNView>
			</ThemeProvider>
		</QueryProvider>
	)
}
