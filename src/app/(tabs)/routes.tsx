import { FavoriteButton } from '@/components/ui/FavoriteButton'
import { DualActionButton } from '@/components/ui/DualActionButton'
import { JourneyVisualizer } from '@/components/JourneyVisualizer'
import { HeaderButton } from '@/components/ui/HeaderButton'
import { useCheapestRoute, useGates } from '@/hooks/useQueries'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Gate } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import { memo, useCallback, useEffect, useState } from 'react'
import {
	FlatList,
	Modal,
	Platform,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import TabPage from '@/components/ui/TabPage'

// Props interface for GateSelector - extracted for type safety
interface GateSelectorProps {
	visible: boolean
	mode: 'source' | 'target' | null
	gates: Gate[] | undefined
	onSelect: (gate: Gate) => void
	onClose: () => void
}

// Extracted component - thanks for suggestion Sam!
const GateSelector = memo(function GateSelector({
	visible,
	mode,
	gates,
	onSelect,
	onClose,
}: GateSelectorProps) {
	// useCallback for item press - prevents new function on each render
	const handleItemPress = useCallback(
		(item: Gate) => {
			onSelect(item)
			onClose()
		},
		[onSelect, onClose]
	)

	// Memoized renderItem - prevents unnecessary re-renders of list items
	const renderItem = useCallback(
		({ item }: { item: Gate }) => (
			<TouchableOpacity
				className="flex-row items-center justify-between border-b border-ui p-4 bg-background"
				onPress={() => handleItemPress(item)}
			>
				<Text className="text-lg font-bold text-foreground">{item.name}</Text>
				<View className="flex-row items-center gap-4">
					<Text className="font-mono text-foreground-muted">{item.code}</Text>
					<FavoriteButton gateCode={item.code} className="p-2" />
				</View>
			</TouchableOpacity>
		),
		[handleItemPress]
	)

	// Stable keyExtractor - avoids inline function recreation
	const keyExtractor = useCallback((item: Gate) => item.code, [])

	return (
		<Modal
			visible={visible}
			animationType="slide"
			presentationStyle="pageSheet"
		>
			<View className="flex-1 bg-panel">
				<View className="flex-row items-center justify-between border-b border-ui bg-panel p-4">
					<Text className="text-xl font-bold text-foreground">
						Select {mode === 'source' ? 'Start' : 'Destination'}
					</Text>
					<TouchableOpacity onPress={onClose}>
						<Text className="font-bold text-primary">Close</Text>
					</TouchableOpacity>
				</View>
				<FlatList
					data={gates}
					keyExtractor={keyExtractor}
					renderItem={renderItem}
				/>
			</View>
		</Modal>
	)
})

export default function RoutesScreen() {
	const { from, to } = useLocalSearchParams<{ from?: string; to?: string }>()
	const [sourceGate, setSourceGate] = useState<Gate | null>(null)
	const [targetGate, setTargetGate] = useState<Gate | null>(null)
	const [selectingMode, setSelectingMode] = useState<
		'source' | 'target' | null
	>(null)
	const Colors = useThemeColor()

	const { data: gates } = useGates()

	useEffect(() => {
		if (gates) {
			if (from) {
				const gate = gates.find((g) => g.code === from)
				if (gate) setSourceGate(gate)
			}
			if (to) {
				const gate = gates.find((g) => g.code === to)
				if (gate) setTargetGate(gate)
			}
		}
	}, [from, to, gates])

	const {
		data: route,
		isLoading,
		// error,
	} = useCheapestRoute(sourceGate?.code || '', targetGate?.code || '')

	// useCallback for handlers - provides stable reference for memoized children
	const handleReset = useCallback(() => {
		setSourceGate(null)
		setTargetGate(null)
	}, [])

	const handleSelectSource = useCallback(() => {
		setSelectingMode('source')
	}, [])

	const handleSelectTarget = useCallback(() => {
		setSelectingMode('target')
	}, [])

	const handleCloseSelector = useCallback(() => {
		setSelectingMode(null)
	}, [])

	// useCallback for gate selection - stable reference for GateSelector
	const handleGateSelect = useCallback(
		(gate: Gate) => {
			if (selectingMode === 'source') {
				setSourceGate(gate)
			} else {
				setTargetGate(gate)
			}
		},
		[selectingMode]
	)

	return (
		<TabPage
			title="Route Finder"
			headerRight={
				(sourceGate || targetGate) && (
					<HeaderButton label="Reset" onPress={handleReset} />
				)
			}
		>
			<DualActionButton
				left={{
					label: sourceGate?.name || 'Select Start',
					icon: 'planet-outline',
					onPress: handleSelectSource,
					highlight: sourceGate?.code,
				}}
				right={{
					label: targetGate?.name || 'Select End',
					icon: 'flag-outline',
					onPress: handleSelectTarget,
					highlight: targetGate?.code,
				}}
				separator={
					<Ionicons
						name="arrow-forward"
						size={24}
						color={Colors.foreground.muted}
					/>
				}
			/>

			{(isLoading || sourceGate || targetGate) && (
				<View>
					<JourneyVisualizer
						sourceGate={sourceGate}
						targetGate={targetGate}
						route={route}
						isLoading={isLoading}
						height={125}
						gates={gates}
					/>
				</View>
			)}

			{route && !isLoading && (
				<View className="animate-in fade-in slide-in-from-bottom-4 rounded-2xl border border-ui bg-panel p-6">
					<Text className="mb-4 text-sm tracking-widest uppercase text-foreground-muted">
						Cheapest Route
					</Text>

					<View className="mb-6 flex-row items-center gap-4">
						<View className="rounded-full bg-primary-muted p-3">
							<Ionicons name="cash-outline" size={32} color={Colors.primary} />
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
							const cost = link ? parseFloat(link.hu) : 0

							return (
								<View
									// Stable key using unique route segment - index keys cause reconciliation issues
									key={`${code}-${nextCode}`}
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
											{link?.hu} AU
										</Text>
									</View>
								</View>
							)
						})}
					</View>
				</View>
			)}
			<GateSelector
				visible={!!selectingMode}
				mode={selectingMode}
				gates={gates}
				onSelect={handleGateSelect}
				onClose={handleCloseSelector}
			/>
		</TabPage>
	)
}
