import { Theme as Colors } from '@/constants/Colors'
import { useCheapestRoute, useGates } from '@/hooks/useQueries'
import { Gate } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import {
	ActivityIndicator,
	FlatList,
	Modal,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function RoutesScreen() {
	const [sourceGate, setSourceGate] = useState<Gate | null>(null)
	const [targetGate, setTargetGate] = useState<Gate | null>(null)
	const [selectingMode, setSelectingMode] = useState<
		'source' | 'target' | null
	>(null)

	const { data: gates } = useGates()
	const {
		data: route,
		isLoading,
		error,
	} = useCheapestRoute(sourceGate?.code || '', targetGate?.code || '')

	const GateSelector = () => (
		<Modal
			visible={!!selectingMode}
			animationType="slide"
			presentationStyle="pageSheet"
		>
			<View className="flex-1 bg-panel">
				<View className="flex-row items-center justify-between border-b border-ui bg-panel p-4">
					<Text className="text-xl font-bold text-foreground">
						Select {selectingMode === 'source' ? 'Start' : 'Destination'}
					</Text>
					<TouchableOpacity onPress={() => setSelectingMode(null)}>
						<Text className="font-bold text-primary">Close</Text>
					</TouchableOpacity>
				</View>
				<FlatList
					data={gates}
					keyExtractor={(item) => item.code}
					renderItem={({ item }) => (
						<TouchableOpacity
							className="flex-row items-center justify-between border-b border-ui p-4 bg-background"
							onPress={() => {
								if (selectingMode === 'source') setSourceGate(item)
								else setTargetGate(item)
								setSelectingMode(null)
							}}
						>
							<Text className="text-lg font-bold text-foreground">
								{item.name}
							</Text>
							<Text className="font-mono text-foreground-muted">
								{item.code}
							</Text>
						</TouchableOpacity>
					)}
				/>
			</View>
		</Modal>
	)

	return (
		<SafeAreaView className="flex-1 bg-background" edges={['top']}>
			<ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
				<Text className="mb-6 text-3xl font-bold text-foreground">
					Route Finder
				</Text>

				<View className="mb-8 flex-row items-center justify-between gap-4">
					<TouchableOpacity
						className="h-32 flex-1 items-center justify-center rounded-xl border border-ui bg-ui p-4"
						onPress={() => setSelectingMode('source')}
					>
						{sourceGate ? (
							<>
								<Text className="mb-2 text-3xl font-bold text-primary">
									{sourceGate.code}
								</Text>
								<Text
									className="text-center text-sm text-foreground-muted"
									numberOfLines={1}
								>
									{sourceGate.name}
								</Text>
							</>
						) : (
							<>
								<Ionicons
									name="planet-outline"
									size={32}
									color={Colors.foreground.muted}
								/>
								<Text className="mt-2 text-foreground-muted">Select Start</Text>
							</>
						)}
					</TouchableOpacity>

					<Ionicons
						name="arrow-forward"
						size={24}
						color={Colors.foreground.muted}
					/>

					<TouchableOpacity
						className="h-32 flex-1 items-center justify-center rounded-xl border border-ui bg-ui p-4"
						onPress={() => setSelectingMode('target')}
					>
						{targetGate ? (
							<>
								<Text className="mb-2 text-3xl font-bold text-primary">
									{targetGate.code}
								</Text>
								<Text
									className="text-center text-sm text-foreground-muted"
									numberOfLines={1}
								>
									{targetGate.name}
								</Text>
							</>
						) : (
							<>
								<Ionicons
									name="flag-outline"
									size={32}
									color={Colors.foreground.muted}
								/>
								<Text className="mt-2 text-foreground-muted">Select End</Text>
							</>
						)}
					</TouchableOpacity>
				</View>

				{isLoading && (
					<ActivityIndicator
						size="large"
						color={Colors.primary}
						className="mt-8"
					/>
				)}

				{route && !isLoading && (
					<View className="animate-in fade-in slide-in-from-bottom-4 rounded-2xl border border-ui bg-panel p-6">
						<Text className="mb-4 text-sm tracking-widest uppercase text-foreground-muted">
							Cheapest Route
						</Text>

						<View className="mb-6 flex-row items-center gap-4">
							<View className="rounded-full bg-primary-muted p-3">
								<Ionicons
									name="cash-outline"
									size={32}
									color={Colors.primary}
								/>
							</View>
							<View>
								<Text className="text-2xl font-bold text-foreground">
									£{route.totalCost.toFixed(2)}
								</Text>
								<Text className="text-sm text-foreground-muted">
									Total Journey Cost
								</Text>
							</View>
						</View>

						<View className="gap-2 rounded-xl bg-background p-4">
							<Text className="mb-2 text-xs text-foreground-dim">
								ROUTE PATH & BREAKDOWN
							</Text>
							{route.route.map((code, index) => {
								if (index === route.route.length - 1) return null

								const nextCode = route.route[index + 1]
								const currentGate = gates?.find((g) => g.code === code)
								const link = currentGate?.links.find((l) => l.code === nextCode)
								const cost = link ? parseFloat(link.hu) : 0 // Assuming 1 HU = £1 based on API observation

								return (
									<View
										key={index}
										className="flex-row items-center justify-between border-b border-dashed border-ui py-2 last:border-0"
									>
										<View className="flex-row items-center gap-2">
											<View className="rounded bg-background px-2 py-1 border border-ui">
												<Text className="font-mono font-bold text-primary">
													{code}
												</Text>
											</View>
											<Ionicons
												name="arrow-forward"
												size={14}
												color={Colors.foreground.muted}
											/>
											<View className="rounded bg-background px-2 py-1 border border-ui">
												<Text className="font-mono font-bold text-primary">
													{nextCode}
												</Text>
											</View>
										</View>
										<View>
											<Text className="font-mono text-foreground">
												£{cost.toFixed(2)}
											</Text>
											<Text className="text-right text-[10px] text-foreground-dim mb-1">
												{link?.hu} HU
											</Text>
										</View>
									</View>
								)
							})}
						</View>
					</View>
				)}

				<GateSelector />
			</ScrollView>
		</SafeAreaView>
	)
}
