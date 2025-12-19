import { GateCard } from '@/components/GateCard'
import { useGates } from '@/hooks/useQueries'
import {
	ActivityIndicator,
	FlatList,
	SafeAreaView,
	StatusBar,
	Text,
	View,
} from 'react-native'

export default function HomeScreen() {
	const { data: gates, isLoading, error } = useGates()

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center bg-slate-950">
				<ActivityIndicator size="large" color="#22d3ee" />
			</View>
		)
	}

	if (error) {
		return (
			<View className="flex-1 items-center justify-center bg-slate-950 p-6">
				<Text className="mb-2 text-center text-lg text-red-400">
					Error loading gates
				</Text>
				<Text className="text-center text-slate-400">
					{(error as Error).message}
				</Text>
			</View>
		)
	}

	return (
		<SafeAreaView className="flex-1 bg-slate-950">
			<StatusBar barStyle="light-content" />
			<View className="flex-1 px-4 py-4">
				<Text className="mb-6 text-3xl font-bold text-white">Star Gates</Text>
				<FlatList
					data={gates}
					keyExtractor={(item) => item.code}
					renderItem={({ item }) => <GateCard gate={item} />}
					contentContainerStyle={{ paddingBottom: 100 }}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</SafeAreaView>
	)
}
