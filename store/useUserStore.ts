import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UserState {
	favorites: string[]
	colorMode: 'system' | 'light' | 'dark'
	toggleFavorite: (code: string) => void
	setColorMode: (mode: 'system' | 'light' | 'dark') => void
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			favorites: [],
			colorMode: 'system',
			toggleFavorite: (code) =>
				set((state) => ({
					favorites: state.favorites.includes(code)
						? state.favorites.filter((c) => c !== code)
						: [...state.favorites, code],
				})),
			setColorMode: (mode) => set({ colorMode: mode }),
		}),
		{
			name: 'user-storage',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
)
