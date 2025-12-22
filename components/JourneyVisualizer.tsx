import React, { useEffect, useState, useMemo } from 'react'
import { View, Text, LayoutChangeEvent, StyleSheet } from 'react-native'
import Svg, {
	Line,
	Circle,
	Text as SvgText,
	G,
	Defs,
	Filter,
	FeGaussianBlur,
	FeMerge,
	FeMergeNode,
} from 'react-native-svg'
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withRepeat,
	withSequence,
	withDelay,
	Easing,
	interpolate,
	Extrapolate,
} from 'react-native-reanimated'
import { Rocket, LucideIcon } from 'lucide-react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Gate } from '@/types'

interface JourneyVisualizerProps {
	sourceGate: Gate | null
	targetGate: Gate | null
	route?: {
		route: string[]
		totalCost: number
	}
	isLoading: boolean
	height?: number
	gates?: Gate[]
	NodeIcon?: LucideIcon
	RocketIcon?: LucideIcon
	nodeColor?: string
	rocketColor?: string
	lineColor?: string
}

interface Position {
	code: string
	x: number
	y: number
}

const STAR_COUNT = 50
const WARP_STAR_COUNT = 20
const LOADING_MESSAGES = [
	'Contacting Hyper Gate Terminal',
	'Transmitting Journey Request',
	'Receiving Starversal Route',
	'Calculating He3 requirements',
]

export function JourneyVisualizer({
	sourceGate,
	targetGate,
	route,
	isLoading,
	height = 200,
	gates,
	NodeIcon,
	RocketIcon,
	nodeColor,
	rocketColor,
	lineColor = '#4ade80', // Prototype Green
}: JourneyVisualizerProps) {
	const Colors = useThemeColor()
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
	const [positions, setPositions] = useState<Position[]>([])
	const [currentMessage, setCurrentMessage] = useState(LOADING_MESSAGES[0])

	const finalNodeColor = nodeColor || Colors.primary
	const finalRocketColor = rocketColor || Colors.primary

	const rocketX = useSharedValue(0)
	const rocketY = useSharedValue(0)
	const rocketRotate = useSharedValue(45)
	const rocketOpacity = useSharedValue(0)
	const warpOpacity = useSharedValue(0)

	// Background stars
	const stars = useMemo(() => {
		return Array.from({ length: STAR_COUNT }).map((_, i) => ({
			id: i,
			left: `${Math.random() * 100}%`,
			top: `${Math.random() * 100}%`,
			size: Math.random() * 2 + 1,
			opacity: Math.random() * 0.5 + 0.2,
		}))
	}, [])

	const onLayout = (event: LayoutChangeEvent) => {
		const { width, height } = event.nativeEvent.layout
		setDimensions({ width, height })
	}

	// Cycle Loading Messages
	useEffect(() => {
		let interval: ReturnType<typeof setInterval>
		if (isLoading) {
			let index = 0
			interval = setInterval(() => {
				index = (index + 1) % LOADING_MESSAGES.length
				setCurrentMessage(LOADING_MESSAGES[index])
			}, 800)
		}
		return () => clearInterval(interval!)
	}, [isLoading])

	// Calculate Map Positions
	useEffect(() => {
		if (dimensions.width > 0 && dimensions.height > 0) {
			const paddingX = 24 // px-6
			const paddingY = 40 // py-10
			const usableWidth = dimensions.width - paddingX * 2

			if (route?.route && route.route.length > 1) {
				// Full route display (multi-node)
				const newPositions: Position[] = []

				// 1. Calculate Raw Leg Distances
				const rawLegs: number[] = []
				for (let i = 0; i < route.route.length - 1; i++) {
					let dist = 1
					if (gates) {
						const g = gates.find((gate) => gate.code === route.route[i])
						const link = g?.links.find((l) => l.code === route.route[i + 1])
						if (link) dist = parseFloat(link.hu) || 1
					}
					rawLegs.push(dist)
				}

				// 2. Calculate Balanced Ratios (Min 10% per leg)
				const legCount = rawLegs.length
				const MIN_RATIO = 0.1 // 10% minimum
				const totalRawDist = rawLegs.reduce((a, b) => a + b, 0) || 1

				const rawRatios = rawLegs.map((d) => d / totalRawDist)
				const smallLegIndices = rawRatios
					.map((r, i) => (r < MIN_RATIO ? i : -1))
					.filter((i) => i !== -1)

				const totalSmallPadding = smallLegIndices.length * MIN_RATIO
				const remainingForLarge = 1 - totalSmallPadding

				const largeLegTotalRawDist = rawLegs.reduce(
					(acc, d, i) => (rawRatios[i] >= MIN_RATIO ? acc + d : acc),
					0
				)

				const balancedRatios = rawLegs.map((d, i) => {
					if (rawRatios[i] < MIN_RATIO) return MIN_RATIO
					return (d / (largeLegTotalRawDist || 1)) * remainingForLarge
				})

				// 3. Position Nodes
				let cumulativeRatio = 0
				let lastY = dimensions.height / 2

				route.route.forEach((code, i) => {
					const x = paddingX + cumulativeRatio * usableWidth
					let y
					if (i === 0) {
						y = paddingY + Math.random() * (dimensions.height - paddingY * 2)
					} else {
						const dx = x - newPositions[i - 1].x
						const maxDY = dx * 0.95
						y = lastY + (Math.random() * maxDY * 2 - maxDY)
						y = Math.max(paddingY, Math.min(dimensions.height - paddingY, y))
					}
					newPositions.push({ code, x, y })
					lastY = y
					if (i < balancedRatios.length) {
						cumulativeRatio += balancedRatios[i]
					}
				})
				setPositions(newPositions)
			} else if (sourceGate) {
				// Single node case: source selected (with no target OR same target)
				setPositions([
					{
						code: sourceGate.code,
						x: paddingX,
						y: dimensions.height / 2,
					},
				])
			} else {
				setPositions([])
			}
		}
	}, [route, dimensions, sourceGate, targetGate])

	// Warp effect sync
	useEffect(() => {
		warpOpacity.value = withTiming(isLoading ? 1 : 0, { duration: 500 })
	}, [isLoading])

	// Rocket Animation Logic
	useEffect(() => {
		let isCancelled = false
		const VERTICAL_OFFSET = 18

		if (positions.length === 0 || isLoading) {
			rocketOpacity.value = withTiming(0, { duration: 300 })
			return () => {
				isCancelled = true
			}
		}

		// Immediate Reset: Snap to the current start node if we're changing routes
		// This prevents "ghost flights" from old routes
		const startX = positions[0].x
		const startY = positions[0].y + VERTICAL_OFFSET

		if (positions.length === 1) {
			// Arriving at source gate
			if (rocketOpacity.value === 0) {
				rocketX.value = -50
				rocketY.value = startY
				rocketRotate.value = 45
				rocketX.value = withTiming(startX, {
					duration: 1000,
					easing: Easing.out(Easing.exp),
				})
				rocketOpacity.value = withTiming(1, { duration: 600 })
			} else {
				rocketX.value = withTiming(startX, { duration: 500 })
				rocketY.value = withTiming(startY, { duration: 500 })
				rocketRotate.value = withTiming(45, { duration: 500 })
				rocketOpacity.value = withTiming(1, { duration: 500 })
			}
		} else if (positions.length > 1) {
			// Executing multi-node flight
			const animateStep = async () => {
				// Snap to start position immediately
				rocketX.value = startX
				rocketY.value = startY

				const next = positions[1]
				const initialAngle =
					Math.atan2(next.y - positions[0].y, next.x - positions[0].x) *
						(180 / Math.PI) +
					45
				rocketRotate.value = initialAngle
				rocketOpacity.value = 1

				for (let i = 1; i < positions.length; i++) {
					if (isCancelled) return

					const pos = positions[i]
					const isFirstLeg = i === 1
					const duration = isFirstLeg ? 1400 : 800
					// Sharp easing for isFirstLeg to simulate overcoming mass/inertia
					const easing = isFirstLeg
						? Easing.bezier(0.7, 0, 1, 0.5)
						: Easing.bezier(0.4, 0, 0.2, 1)

					rocketX.value = withTiming(pos.x, { duration, easing })
					rocketY.value = withTiming(pos.y + VERTICAL_OFFSET, {
						duration,
						easing,
					})

					await new Promise((r) => setTimeout(r, duration + 50))
					if (isCancelled) return

					if (i < positions.length - 1) {
						const next = positions[i + 1]
						const nextAngle =
							Math.atan2(next.y - pos.y, next.x - pos.x) * (180 / Math.PI) + 45
						rocketRotate.value = withTiming(nextAngle, { duration: 300 })
						await new Promise((r) => setTimeout(r, 350))
					}
				}
			}
			animateStep()
		}

		return () => {
			isCancelled = true
		}
	}, [positions, isLoading])

	const animatedRocketStyle = useAnimatedStyle(() => ({
		left: rocketX.value - 16,
		top: rocketY.value - 16,
		transform: [{ rotate: `${rocketRotate.value}deg` }],
		opacity: rocketOpacity.value,
	}))

	const animatedWarpStyle = useAnimatedStyle(() => ({
		opacity: warpOpacity.value,
	}))

	return (
		<View
			style={{ backgroundColor: Colors.panel, height }}
			onLayout={onLayout}
			className="w-full relative overflow-hidden rounded-3xl border border-ui"
		>
			{/* Background stars */}
			{stars.map((star) => (
				<View
					key={star.id}
					className="absolute bg-white rounded-full"
					style={{
						left: star.left as any,
						top: star.top as any,
						width: star.size,
						height: star.size,
						opacity: star.opacity,
					}}
				/>
			))}

			{/* Warp star overlay */}
			<Animated.View
				style={[StyleSheet.absoluteFill, animatedWarpStyle]}
				pointerEvents="none"
			>
				{Array.from({ length: WARP_STAR_COUNT }).map((_, i) => (
					<WarpStar key={i} dimensions={dimensions} index={i} />
				))}
			</Animated.View>

			{/* Map SVG */}
			<Svg style={StyleSheet.absoluteFill}>
				<Defs>
					<Filter id="glow">
						<FeGaussianBlur stdDeviation="2" result="blur" />
						<FeMerge>
							<FeMergeNode in="blur" />
							<FeMergeNode in="SourceGraphic" />
						</FeMerge>
					</Filter>
				</Defs>

				{/* Paths & Distances */}
				{positions.map((pos, i) => {
					if (i === 0) return null
					const prev = positions[i - 1]

					// Distance lookup
					let distance = ''
					if (gates) {
						const prevGate = gates.find((g) => g.code === prev.code)
						const link = prevGate?.links.find((l) => l.code === pos.code)
						if (link) distance = `${link.hu} AU`
					}

					return (
						<G key={`path-${i}`}>
							<Line
								x1={prev.x}
								y1={prev.y}
								x2={pos.x}
								y2={pos.y}
								stroke={lineColor}
								strokeWidth="1.5"
								strokeDasharray="4,4"
								opacity={0.6}
							/>
							{distance && (
								<SvgText
									x={(prev.x + pos.x) / 2}
									y={(prev.y + pos.y) / 2 - 10}
									fill={lineColor}
									fontSize="10"
									fontWeight="600"
									textAnchor="middle"
									opacity={0.8}
								>
									{distance}
								</SvgText>
							)}
						</G>
					)
				})}

				{/* Nodes */}
				{positions.map((pos, i) => (
					<G key={`node-${i}`}>
						{NodeIcon ? (
							<G transform={`translate(${pos.x - 8}, ${pos.y - 8})`}>
								<NodeIcon size={16} color={finalNodeColor} />
							</G>
						) : (
							<Circle cx={pos.x} cy={pos.y} r="4" fill={finalNodeColor} />
						)}
						<SvgText
							x={pos.x}
							y={pos.y - 12}
							fill={Colors.foreground.dim}
							fontSize="10"
							fontWeight="bold"
							textAnchor="middle"
						>
							{pos.code}
						</SvgText>
					</G>
				))}
			</Svg>

			{/* Rocket */}
			<Animated.View
				className="absolute w-8 h-8 items-center justify-center"
				style={animatedRocketStyle}
			>
				{RocketIcon ? (
					<RocketIcon size={24} color={finalRocketColor} />
				) : (
					<Rocket size={24} color={finalRocketColor} />
				)}
			</Animated.View>

			{/* Loading Overlay */}
			{isLoading && (
				<View className="absolute inset-0 items-center justify-center p-6 bg-slate-950/20">
					<View className="bg-slate-950/90 rounded-full px-6 py-3 border border-primary/30 flex-row items-center">
						<Animated.View
							className="w-2 h-2 rounded-full bg-primary mr-3"
							style={{ opacity: 0.8 }}
						/>
						<Text className="text-white font-bold tracking-tight">
							{currentMessage.toUpperCase()}
						</Text>
					</View>
				</View>
			)}

			{/* Empty State */}
			{!sourceGate && !isLoading && (
				<View className="absolute inset-0 items-center justify-center p-6">
					<Text className="text-foreground-dim text-sm italic">
						Initialize navigation system...
					</Text>
				</View>
			)}
		</View>
	)
}

function WarpStar({
	dimensions,
	index,
}: {
	dimensions: { width: number; height: number }
	index: number
}) {
	const swim = useSharedValue(0)
	const left = useMemo(
		() => Math.random() * (dimensions.width || 300),
		[dimensions.width]
	)

	useEffect(() => {
		swim.value = withRepeat(
			withSequence(
				withDelay(
					index * 120,
					withTiming(1, { duration: 700, easing: Easing.linear })
				),
				withTiming(0, { duration: 0 })
			),
			-1
		)
	}, [dimensions])

	const animatedStyle = useAnimatedStyle(() => ({
		position: 'absolute',
		left: left,
		top: interpolate(
			swim.value,
			[0, 1],
			[-80, dimensions.height || 400],
			Extrapolate.CLAMP
		),
		height: interpolate(swim.value, [0, 1], [0, 100], Extrapolate.CLAMP),
		width: 1,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		opacity: interpolate(swim.value, [0, 0.2, 0.8, 1], [0, 0.5, 0.5, 0]),
	}))

	return <Animated.View style={animatedStyle} />
}
