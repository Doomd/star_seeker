import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UserState {
	favorites: string[]
	colorMode: 'system' | 'light' | 'dark'
	_hasHydrated: boolean
	toggleFavorite: (code: string) => void
	setColorMode: (mode: 'system' | 'light' | 'dark') => void
	setHasHydrated: (state: boolean) => void
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			favorites: [],
			colorMode: 'system',
			_hasHydrated: false,
			toggleFavorite: (code) =>
				set((state) => ({
					favorites: state.favorites.includes(code)
						? state.favorites.filter((c) => c !== code)
						: [...state.favorites, code],
				})),
			setColorMode: (mode) => set({ colorMode: mode }),
			setHasHydrated: (state) => set({ _hasHydrated: state }),
		}),
		{
			name: 'user-storage',
			storage: createJSONStorage(() => AsyncStorage),
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true)
			},
		}
	)
)
