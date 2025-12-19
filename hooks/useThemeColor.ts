import { Colors } from '@/constants/Colors'
import { useUserStore } from '@/store/useUserStore'

export function useThemeColor() {
	const userTheme = useUserStore((state) => state.colorMode)
	return Colors[userTheme]
}

export function useIsDark() {
	const userTheme = useUserStore((state) => state.colorMode)
	return userTheme === 'dark'
}
