import { Colors } from '@/constants/Colors'
import { useUserStore } from '@/store/useUserStore'
import { useColorScheme } from 'react-native'

export function useThemeColor() {
	const systemTheme = useColorScheme() ?? 'light'
	const userTheme = useUserStore((state) => state.colorMode)

	const activeTheme = userTheme === 'system' ? systemTheme : userTheme
	return Colors[activeTheme]
}

export function useIsDark() {
	const systemTheme = useColorScheme() ?? 'light'
	const userTheme = useUserStore((state) => state.colorMode)
	const activeTheme = userTheme === 'system' ? systemTheme : userTheme
	return activeTheme === 'dark'
}
